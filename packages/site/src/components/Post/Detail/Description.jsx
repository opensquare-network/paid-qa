import styled from "styled-components";
import IpfsSquare from "@osn/common-ui/es/IpfsSquare";
import ActionBar from "./ActionBar";
import {
  p_14_normal,
  p_16_semibold,
} from "@osn/common-ui/es/styles/textStyles";
import { MarkdownPreviewer } from "@osn/previewer";

const Wrapper = styled.div`
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${p_16_semibold};
  }
  > :nth-child(2) {
    margin-top: 16px;
    ${p_14_normal};
  }
  > :nth-child(3) {
    margin-top: 15px;
  }
`;

export default function Description({ topic }) {
  return (
    <Wrapper>
      <div>
        <span>Description</span>
        <IpfsSquare
          href={
            topic.pinned ? `https://ipfs.infura.io/ipfs/${topic.cid}` : null
          }
        />
      </div>
      <MarkdownPreviewer content={topic.content} />
      <ActionBar
        topicCid={topic.cid}
        topicOwner={topic.signer}
        funds={topic?.funds}
        topicNetwork={topic?.network}
      />
    </Wrapper>
  );
}
