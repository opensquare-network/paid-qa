import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import DividerWrapper from "@osn/common-ui/lib/styled/DividerWrapper";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  font-size: 14px;
  line-height: 24px;
  color: #506176;
  > :nth-child(2) {
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
        <StyledDividerWrapper>
          <div>Answer to</div>
          <div>
            What tool we should use to measure effectiveness of PH Launch?
          </div>
          <div>2 hours ago</div>
        </StyledDividerWrapper>
        <Divider />
        <Content>
          Nec dolor ut ut diam venenatis amet id malesuada venenatis. Viverra at
          mi arcu vitae. Quam dignissim iaculis nisi, enim. Consectetur sem sit
          mi montes, pretium gravida donec interdum. Dictumst elit dignissim
          tellus euismod. At nunc, id suspendisse augue sagittis pulvinar.
          Pellentesque vitae quam eget est, massa facilisi imperdiet cursus.
          Varius euismod at justo, sagittis. At tortor vulputate leo, nunc
          integer. Tortor risus, habitant dictum in suspendisse curabitur.
          Volutpat, porttitor eros nullam mattis consectetur risus, bibendum vel
          egestas. Nec magna arcu, facilisis condimentum est tristique elementum
          purus. Consequat pellentesque risus fermentum, rhoncus, justo habitant
          phasellus diam.
        </Content>
      </Card>
    </Wrapper>
  );
}
