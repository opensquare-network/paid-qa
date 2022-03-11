import styled from "styled-components";

import Title from "./Title";
// import Rewards from "./Rewards";
import Description from "./Description";
import Appendants from "./Appendants";
import Share from "./Share";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f0f3f8;
  padding: 32px;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
    0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  > :not(:first-child) {
    padding-top: 20px;
    border-top: solid 1px #f0f3f8;
  }
  > :not(:last-child) {
    padding-bottom: 20px;
  }
`;

export default function Detail({ topic }) {
  const account = useSelector(accountSelector);
  const isOwner =
    account?.address === topic.signer && account?.network === topic.network;

  return (
    <Wrapper>
      <Title topic={topic} />
      {/* <Rewards rewards={topic.rewards} /> */}
      <Description topic={topic} />
      <Appendants appendants={topic.appendants} isOwner={isOwner} />
      <Share />
    </Wrapper>
  );
}
