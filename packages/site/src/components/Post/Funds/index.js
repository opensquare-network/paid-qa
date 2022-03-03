import styled from "styled-components";

import Card from "components/Card";

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ContentWrapper = styled.div`
  margin-top: 16px;
`;

const Item = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > :first-child {
    color: #a1a8b3;
  }
`;

export default function Promises() {
  return (
    <Card>
      <Title className="flex items-center justify-between">
        <div>Funds</div>
        <img src="/imgs/icons/status.svg" alt="" />
      </Title>
      <ContentWrapper>
        <Item>
          <div>#21</div>
          <div>1 RMRK</div>
        </Item>
        <Item>
          <div>#28</div>
          <div>1.26 DOT</div>
        </Item>
      </ContentWrapper>
    </Card>
  );
}
