import styled from "styled-components";

import Input from "ui/lib/styled/Input";
import Select from "./Select";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > :first-child {
    font-family: "Montserrat";
    font-weight: bold;
    font-size: 36px;
    line-height: 36px;
  }
  > :nth-child(2) {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #506176;
    margin-left: 40px;
  }
`;

const ContentWrapper = styled.div`
  padding: 24px;
  display: flex;
  background: #ffffff;
  border: 1px solid #f0f3f8;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  > :not(:first-child) {
    margin-left: 20px;
  }
`;

const ItemWrapper = styled.div`
  :first-child {
    flex: 1 1 auto;
  }
  :not(:first-child) {
    flex: 0 0 243px;
  }
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    > img {
      width: 24px;
      height: 24px;
    }
  }
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

export default function Explorer() {
  return (
    <Wrapper>
      <TitleWrapper>
        <div>Explorer</div>
        <div>All Questions (202)</div>
      </TitleWrapper>
      <ContentWrapper>
        <ItemWrapper>
          <div>
            <div>Search</div>
            <img src="/imgs/icons/search.svg" alt="" />
          </div>
          <Input placeholder="Search the OpenSquare Q&A" />
        </ItemWrapper>
        <ItemWrapper>
          <div>
            <div>Status</div>
            <img src="/imgs/icons/sort-by.svg" alt="" />
          </div>
          <Select placeholder="All Types" />
        </ItemWrapper>
        <ItemWrapper>
          <div>
            <div>Rewards</div>
            <img src="/imgs/icons/status.svg" alt="" />
          </div>
          <Select placeholder="All Assets" />
        </ItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
