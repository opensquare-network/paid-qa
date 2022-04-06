import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import User from "components/Profile/User";
import Tabs from "./Tabs";
import { useEffect, useState } from "react";

import serverApi from "services/serverApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import { MOBILE_SIZE } from "@osn/common-ui/lib/utils/constants";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";

const Wrapper = styled.div`
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
  padding-top: 40px;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    padding-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 32px;
  }
  > :nth-child(1) {
    flex-wrap: wrap;
    justify-content: center;
  }
  > :nth-child(2) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const AboutWrapper = styled(FlexCenter)`
  margin-top: 16px;
  padding-bottom: 4px;
  > * {
    display: flex;
    align-items: flex-start;
    > :nth-child(2) {
      margin-left: 8px;
      > :first-child {
        ${p_16_semibold};
      }
      > :nth-child(2) {
        ${p_14_normal};
        color: #506176;
        margin-top: 1px;
      }
    }
    &:not(:first-child)::before {
      content: "";
      align-self: center;
      width: 1px;
      height: 20px;
      background: #e2e8f0;
      margin: 0 20px;
    }
  }
`;

const sum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);
const avg = (arr) => (arr?.length > 0 ? sum(arr) / arr.length : undefined);

export default function Header({ network, address, tab, setTab, overview }) {
  const dispatch = useDispatch();
  const [promises, setPromises] = useState({});
  const percentages = Object.values(promises).map(
    ({ fund, promise }) => fund / promise
  );
  const avgPercentage = avg(percentages) || 0;

  useEffect(() => {
    serverApi
      .fetch(`/network/${network}/address/${address}/promises`)
      .then(({ result, error }) => {
        setPromises(result ?? {});
        if (error) {
          dispatch(
            addToast({
              type: ToastTypes.Error,
              message: error?.message || "Failed to load promises",
            })
          );
        }
      });
  }, [dispatch, network, address]);

  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <div>
            <User network={network} address={address} />
            <AboutWrapper>
              <div>
                <img src="/imgs/icons/promise.svg" alt="" />
                <div>
                  <div>Promises</div>
                  <div>{parseInt(avgPercentage * 100)}%</div>
                </div>
              </div>
            </AboutWrapper>
          </div>
          <div>
            <Tabs value={tab} setValue={setTab} overview={overview} />
          </div>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
