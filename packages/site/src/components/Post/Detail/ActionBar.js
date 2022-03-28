import { useState } from "react";
import styled from "styled-components";
import FundButton from "../../FundButton";
import FundModel from "../../FundModel";
import Funders from "../../Funders";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { isSamePublicKey } from "@osn/common-ui/lib/utils/address";

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

export default function ActionBar({ topicCid, topicOwner, funds }) {
  const [expand, setExpand] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const account = useSelector(accountSelector);
  const isOwner = account && isSamePublicKey(account.address, topicOwner);

  return (
    <Wrapper>
      <Buttons>
        <div>
          <FundButton
            text="Fund"
            expand={expand}
            setExpand={setExpand}
            onFund={() => setShowFund(true)}
            canExpand={funds?.length > 0}
            disabled={!account || isOwner}
          />
        </div>
      </Buttons>
      {expand && <Funders funds={funds} />}
      <FundModel
        ipfsCid={topicCid}
        beneficiary={topicOwner}
        open={showFund}
        setOpen={setShowFund}
      />
    </Wrapper>
  );
}
