import styled from "styled-components";

import Card from "ui/lib/styled/Card";
import Title from "./Title";
// import Rewards from "./Rewards";
import Description from "./Description";
import Appendants from "./Appendants";
import Share from "./Share";

const Wrapper = styled(Card)`
  > :not(:first-child) {
    padding-top: 20px;
    border-top: solid 1px #f0f3f8;
  }
  > :not(:last-child) {
    padding-bottom: 20px;
  }
`;

export default function Detail({ topic }) {
  return (
    <Wrapper>
      <Title topic={topic} />
      {/* <Rewards rewards={topic.rewards} /> */}
      <Description topic={topic} />
      <Appendants appendants={topic.appendants} />
      <Share />
    </Wrapper>
  );
}
