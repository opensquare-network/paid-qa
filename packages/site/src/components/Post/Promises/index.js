import styled from "styled-components";

import Card from "components/Card";
import Item from "./Item";

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: solid 1px #f0f3f8;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const ContentWrapper = styled.div`
  padding: 16px 0 4px;
  > :not(:first-child) {
    margin-top: 12px;
  }
`;

export default function Promises({ rewards }) {
  if (!rewards || rewards.length === 0) {
    return null;
  }

  return (
    <Card>
      <Title className="flex items-center justify-between">
        <div>Promises</div>
        <img src="/imgs/icons/support.svg" alt="" />
      </Title>
      <ContentWrapper>
        {
          rewards.map((reward, index) => (
            <Item key={index} reward={reward} />
          ))
        }
      </ContentWrapper>
    </Card>
  );
}
