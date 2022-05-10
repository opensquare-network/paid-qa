import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import Title from "./Title";
import Description from "./Description";
import Appendants from "./Appendants";
import Share from "./Share";
import Resolve from "./Resolve";
import DetailLoader from "@osn/common-ui/lib/Skeleton/DetailLoader";
import { useIsOwner } from "../../../utils/hooks";

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
  const isOwner = useIsOwner(topic?.signer, topic?.network);

  if (!topic) {
    return <DetailLoader />;
  }

  return (
    <Wrapper>
      <Title topic={topic} />
      <Description topic={topic} />
      <Appendants
        topicCid={topic.cid}
        topicNetwork={topic.network}
        appendants={topic.appendants}
        editable={isOwner && topic.status !== "resolved"}
      />
      <Share />
      <Resolve topic={topic} />
    </Wrapper>
  );
}
