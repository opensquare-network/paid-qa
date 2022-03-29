import styled from "styled-components";

import Container from "@osn/common-ui/lib/styled/Container";
import Profile from "components/User/Profile";
import Tabs from "./Tabs";
import NewTopicButton from "components/NewTopicButton";
import { useEffect, useState } from "react";

import serverApi from "services/serverApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
  padding-top: 40px;
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 32px;
  }
  > :nth-child(1) {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  > :nth-child(2) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const AboutWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  > * {
    display: flex;
    align-items: flex-start;
    > :nth-child(2) {
      margin-left: 8px;
      > :first-child {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }
      > :nth-child(2) {
        font-size: 14px;
        line-height: 24px;
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

export default function Header({ network, address, tab, setTab }) {
  const dispatch = useDispatch();
  const [promises, setPromises] = useState({});
  const precents = Object.values(promises).map(
    ({ fund, promise }) => fund / promise
  );
  const precent = avg(precents) || 0;

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
            <Profile network={network} address={address} />
            <AboutWrapper>
              <div>
                <img src="/imgs/icons/promise.svg" alt="" />
                <div>
                  <div>Promises</div>
                  <div>{parseInt(precent * 100)}%</div>
                </div>
              </div>
              <div>
                <img src="/imgs/icons/treasury.svg" alt="" />
                <div>
                  <div>Rewards</div>
                  <div>0</div>
                </div>
              </div>
            </AboutWrapper>
          </div>
          <div>
            <Tabs value={tab} setValue={setTab} />
            <NewTopicButton />
          </div>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
