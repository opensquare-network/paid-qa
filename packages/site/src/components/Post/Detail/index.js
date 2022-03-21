import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import Title from "./Title";
import Rewards from "./Rewards";
import Description from "./Description";
import Appendants from "./Appendants";
import Share from "./Share";
import ActionBar from "./ActionBar";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";

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
  const account = useSelector(accountSelector);
  const isOwner =
    account?.address &&
    encodeNetworkAddress(account?.address, topic.network) ===
      encodeNetworkAddress(topic.signer, topic.network);

  return (
    <Wrapper>
      <Title topic={topic} />
      <Rewards />
      <Description topic={topic} />
      <ActionBar
        topicCid={topic.cid}
        topicOwner={topic.signer}
        funds={topic.funds}
      />
      <Appendants
        topicCid={topic.cid}
        topicNetwork={topic.network}
        appendants={topic.appendants}
        isOwner={isOwner}
      />
      <Share />
    </Wrapper>
  );
}
