import styled from "styled-components";

import Card from "ui/lib/styled/Card";
import Item from "./Item";
import Pagination from "ui/lib/styled/Pagination";

const Title = styled.div`
  border-bottom: solid 1px #f0f3f8;
  > div {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 17px;
    border-bottom: solid 3px #04d2c5;
    display: inline-block;
  }
`;

const PagnationWrapper = styled.div`
  margin: 20px 0;
`;

export default function Answers() {
  return (
    <Card>
      <Title>
        <div>Answers</div>
      </Title>
      <div>
        <Item />
        <Item />
        <Item />
      </div>
      <PagnationWrapper>
        <Pagination className="pagination" page={1} pageSize={10} total={90} />
      </PagnationWrapper>
    </Card>
  );
}
