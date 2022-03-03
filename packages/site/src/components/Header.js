import styled from "styled-components";

import Notification from "./Notification";
import ChainSelector from "./Chain/ChainSelector";
import AccountSelector from "ui/lib/Account/accountSelector";

const Wrapper = styled.header`
  position: relative;
  flex: 0 0 auto;
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: 80px;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 800px) {
    min-height: 62px;
    padding: 15px 20px;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 200px;
  height: 36px;
  background-image: url("/imgs/opensquare-logo.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    width: 48px;
    height: 32px;
    background-image: url("/imgs/opensquare-logo-icon.svg");
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background: #e2e8f0;
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  > img {
    width: 24px;
    margin-right: 8px;
  }
`;

const RightWrapper = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 16px;
  }
`;

export default function Header() {
  const accounts = [
    {
      address: "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      name: "test1",
    },
  ];
  return (
    <Wrapper>
      <ContentWrapper>
        <LeftWrapper>
          <Logo />
          <Divider />
          <AppWrapper>
            <img src="/imgs/icons/apps.svg" alt="" />
            Paid QA
          </AppWrapper>
        </LeftWrapper>
        <RightWrapper>
          <ChainSelector
            chains={[{ network: "polkadot" }, { network: "kusama" }]}
          />
          <AccountSelector
            accounts={accounts}
            chain={{ network: "polkadot" }}
          />
          <Notification />
        </RightWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
