import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";
import { useEffect, useState } from "react";

import NoPost from "components/NoPost";
import ListLoader from "components/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import Time from "@osn/common-ui/lib/Time";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { Avatar } from "@osn/common-ui/lib";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import { addressEllipsis } from "@osn/common-ui/lib/utils/address";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";
import IdentityOrAddr from "../User/IdentityOrAddr";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
  a {
    :hover {
      text-decoration: underline;
    }
    cursor: pointer;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  ${p_14_normal};
  color: #506176;

  > :nth-child(2) {
    font-weight: 500;
    color: #1e2134;
  }
`;

const TextMajor = styled.span`
  font-weight: 500;
  color: #1e2134;
`;

const MarginX8 = styled(Flex)`
  margin-left: 8px;
  margin-right: 8px;
`;

const TextAccessory = styled.div`
  color: #a1a8b3;
`;

export default function FundsList({ network, address }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [funds, setFunds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    serverApi
      .fetch(`/network/${network}/address/${address}/funds`, { page })
      .then(({ result, error }) => {
        setFunds(result ?? EmptyList);
        if (error) {
          dispatch(
            addToast({
              type: ToastTypes.Error,
              message: error?.message || "Failed to load replies",
            })
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, network, address, page]);

  return (
    <Wrapper>
      {isLoading ? (
        <ListLoader />
      ) : funds?.items?.length === 0 ? (
        <NoPost message={"No current replies"} />
      ) : (
        funds?.items?.map((fund, index) => {
          const topic = fund.topic ?? fund.answerTopic;
          return (
            <Card key={index}>
              <StyledDividerWrapper>
                Funded
                <Flex>
                  <MarginX8>
                    <Avatar address={fund.beneficiary} />
                  </MarginX8>
                  <ChainIcon chainName={network} size={16} />
                  &nbsp;
                  <IdentityOrAddr
                    address={fund.beneficiary}
                    network={fund.network}
                  />
                  &nbsp;with&nbsp;
                  <TextMajor>
                    {fund.value} {fund.symbol}
                  </TextMajor>
                  &nbsp;in&nbsp;
                  <Link to={`/topic/${topic.cid}`}>
                    <TextMajor>{topic.title}</TextMajor>
                  </Link>
                </Flex>
                <TextAccessory>
                  <Time time={fund.blockTime} />
                </TextAccessory>
              </StyledDividerWrapper>
            </Card>
          );
        })
      )}
      <Pagination
        className="pagination"
        {...{ ...funds, page, setPage }}
        large
      />
    </Wrapper>
  );
}
