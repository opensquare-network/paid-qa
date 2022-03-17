import { useState } from "react";
import styled from "styled-components";
import FundButton from "../../FundButton";
import FundModel from "../../FundModel";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export default function ActionBar({ answerCid, answerOwner }) {
  const [expand, setExpand] = useState(false);
  const [showFund, setShowFund] = useState(false);

  return (
    <Wrapper>
      <FundButton
        text="Fund"
        expand={expand}
        setExpand={setExpand}
        onFund={() => setShowFund(true)}
      />
      <FundModel
        ipfsCid={answerCid}
        beneficiary={answerOwner}
        open={showFund}
        setOpen={setShowFund}
      />
    </Wrapper>
  );
}
