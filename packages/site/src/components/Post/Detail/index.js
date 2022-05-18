import styled from "styled-components";

import Card from "@osn/common-ui/lib/styled/Card";
import Title from "./Title";
import Description from "./Description";
import Appendants from "./Appendants";
import Share from "./Share";
import Resolve from "./Resolve";
import DetailLoader from "@osn/common-ui/lib/Skeleton/DetailLoader";
import { useIsOwner } from "../../../utils/hooks";
import { netural_grey_200 } from "@osn/common-ui/lib/styles/colors";

const Divider = styled.div`
  height: 1px;
  background-color: ${netural_grey_200};
  margin: 20px 0;
`;
const Gap = styled.div`
  margin: 20px 0;
`;

export default function Detail({ topic }) {
  const isOwner = useIsOwner(topic?.signer, topic?.network);

  if (!topic) {
    return <DetailLoader />;
  }

  return (
    <Card>
      <Title topic={topic} />
      <Divider />
      <Description topic={topic} />
      <Divider />
      <Appendants
        topicCid={topic.cid}
        topicNetwork={topic.network}
        appendants={topic.appendants}
        editable={isOwner && topic.status !== "resolved"}
      />
      <Divider />
      <Share />
      <Gap />
      <Resolve topic={topic} />
    </Card>
  );
}
