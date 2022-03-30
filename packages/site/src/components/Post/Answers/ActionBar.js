import { useCallback, useState } from "react";
import styled from "styled-components";
import FundButton from "../../FundButton";
import FundModel from "../../FundModel";
import Funders from "../../Funders";
import { ReactComponent as ReplyIcon } from "imgs/icons/reply.svg";
import {
  encodeNetworkAddress,
  isSamePublicKey,
} from "@osn/common-ui/lib/utils/address";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const ReplyButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: #a1a8b3;
  :hover {
    color: #506176;
    > svg path {
      fill: #506176;
    }
  }
`;

const Reply = styled.div`
  ${p_14_normal};
  margin-left: 8px;
`;

export default function ActionBar({
  answerCid,
  answerOwner,
  answerNetwork,
  funds,
  onReply,
}) {
  const [expand, setExpand] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const account = useSelector(accountSelector);
  const isOwner = account && isSamePublicKey(account.address, answerOwner);

  const onReplyClick = useCallback(() => {
    const network = answerNetwork;
    const address = encodeNetworkAddress(answerOwner, network);
    onReply({ network, address });
  }, [answerOwner, answerNetwork, onReply]);

  return (
    <Wrapper>
      <FlexBetween>
        <Flex>
          <ReplyButton onClick={onReplyClick}>
            <ReplyIcon />
            <Reply>Reply</Reply>
          </ReplyButton>

          <FundButton
            text="Fund"
            expand={expand}
            setExpand={setExpand}
            onFund={() => setShowFund(true)}
            canExpand={funds?.length > 0}
            disabled={!account || isOwner}
          />
        </Flex>
      </FlexBetween>
      {expand && <Funders funds={funds} />}
      <FundModel
        ipfsCid={answerCid}
        beneficiary={answerOwner}
        open={showFund}
        setOpen={setShowFund}
      />
    </Wrapper>
  );
}
