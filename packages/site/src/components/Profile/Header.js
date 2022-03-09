import styled from "styled-components";

import Container from "components/Container";
import Breadcrumb from "components/Breadcrumb";
import Profile from "components/User/Profile";
import Tabs from "./Tabs";
import NewTopicButton from "components/NewTopicButton";

const Wrapper = styled.div`
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
  padding-top: 40px;
`;

const ContentWrapper = styled.div`
  > :not(:first-child) {
    margin-top: 32px;
  }
  > :nth-child(2) {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  > :nth-child(3) {
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
      background: #E2E8F0;
      margin: 0 20px;
    }
  }
`;

export default function Header({ tab, setTab }) {
  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Breadcrumb value="Profile" />
          <div>
            <Profile />
            <AboutWrapper>
              <div>
                <img src="/imgs/icons/support.svg" alt="" />
                <div>
                  <div>Promises</div>
                  <div>50%</div>
                </div>
              </div>
              <div>
                <img src="/imgs/icons/status.svg" alt="" />
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
