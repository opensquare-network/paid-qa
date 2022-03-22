import { useCallback, useState } from "react";
import styled from "styled-components";
import FundButton from "../../FundButton";
import FundModel from "../../FundModel";
import Funders from "../../Funders";
import { ReactComponent as ReplyIcon } from "imgs/icons/reply.svg";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  font-size: 14px;
  line-height: 24px;
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

  const onReplyClick = useCallback(() => {
    const network = answerNetwork;
    const address = encodeNetworkAddress(answerOwner, network);
    onReply({ network, address });
  }, [answerOwner, answerNetwork, onReply]);

  return (
    <Wrapper>
      <Buttons>
        <div className="flex">
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
          />
        </div>
      </Buttons>
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
