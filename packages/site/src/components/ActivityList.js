import styled from "styled-components";

import Card from "./Card";
import DividerWrapper from "./DividerWrapper";
import User from "./User";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 8px;
  }
  > :nth-child(2) {
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  font-size: 14px;
  line-height: 24px;
  color: #506176;
  > :first-child {
    font-weight: 500;
    color: #1e2134;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f3f8;
  margin: 16px 0;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #506176;
`;

export default function AnswerList() {
  return (
    <Wrapper>
      <Card>
        <HeaderWrapper>
          <User />
          <div>mentioned you in</div>
          <StyledDividerWrapper>
            <div>Et sed at blandit nec ut.</div>
            <div>2 hours ago</div>
          </StyledDividerWrapper>
        </HeaderWrapper>
        <Divider />
        <Content>
          @Butterbean Laoreet at cras tristique viverra elementum turpis donec.
          Netus condimentum ipsum pretium morbi tincidunt praesent id vulputate
          vulputate. Risus ultrices enim tincidunt fames @Butterbean nullam
          aliquam convallis congue.
        </Content>
      </Card>
    </Wrapper>
  );
}
