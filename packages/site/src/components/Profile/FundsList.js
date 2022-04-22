import styled from "styled-components";
import Card from "@osn/common-ui/lib/styled/Card";
import { useEffect, useState } from "react";
import ListLoader from "@osn/common-ui/lib/Skeleton/ListLoader";
import Pagination from "@osn/common-ui/lib/styled/Pagination";
import NoData from "@osn/common-ui/lib/NoData";
import { useDispatch } from "react-redux";
import serverApi from "services/serverApi";
import { newErrorToast } from "store/reducers/toastSlice";
import { EmptyList } from "utils/constants";
import Time from "@osn/common-ui/lib/Time";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import { Avatar } from "@osn/common-ui/lib";
import ChainIcon from "@osn/common-ui/lib/Chain/ChainIcon";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { Link } from "react-router-dom";
import IdentityOrAddr from "../User/IdentityOrAddr";
import Wrapper from "./styled/ListWrapper";

const StyledDividerWrapper = styled(Flex)`
  ${p_14_normal};
  color: #506176;

  > :nth-child(2) {
    font-weight: 500;
    color: #1e2134;
  }

  > :nth-child(6)::after {
    content: "·";
    margin: 0 8px;
    color: #a1a8b3;
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
          dispatch(newErrorToast(error?.message || "Failed to load funds"));
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
        <NoData message={"No current funds"} />
      ) : (
        funds?.items?.map((fund, index) => {
          const topic = fund.topic ?? fund.answer?.topic;
          return (
            <Card key={index}>
              <StyledDividerWrapper>
                <span>Funded</span>
                <MarginX8>
                  <Avatar address={fund.beneficiary} />
                </MarginX8>
                <ChainIcon chainName={fund.network} size={16} />
                &nbsp;
                <IdentityOrAddr
                  address={fund.beneficiary}
                  network={fund.network}
                />
                &nbsp;with&nbsp;
                <TextMajor>
                  {fund.bounty.value} {fund.bounty.symbol}
                </TextMajor>
                &nbsp;in&nbsp;
                <Link to={`/topic/${topic?.cid}`}>
                  <TextMajor>{topic?.title}</TextMajor>
                </Link>
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
