import { useRef, useState } from "react";
import styled from "styled-components";
import FundButton from "../../FundButton";
import FundModel from "../../FundModel";
import Funders from "../../Funders";
import { useSelector } from "react-redux";
import { accountSelector } from "store/reducers/accountSlice";
import { isSamePublicKey } from "@osn/common-ui/lib/utils/address";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import { useOnClickOutside } from "@osn/common-ui/lib/utils/hooks";
import ReportModal from "../../ReportModal";
import More from "../../Icon/More";
import Flex from "@osn/common-ui/lib/styled/Flex";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  svg.more {
    cursor: pointer;

    &:hover * {
      fill: #506176;
    }
  }
`;

const MoreActions = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  position: absolute;
  right: 0;
  top: 26px;
  background-color: white;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
`;

const MoreActionItem = styled(FlexBetween)`
  user-select: none;
  width: 128px;
  cursor: pointer;
  color: #506176;
  &:hover {
    color: #1e2134;
  }
`;

export default function ActionBar({ topicCid, topicOwner, funds }) {
  const [expand, setExpand] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const account = useSelector(accountSelector);
  const isOwner = account && isSamePublicKey(account.address, topicOwner);
  const [showReport, setShowReport] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const buttonRef = useRef(null);
  useOnClickOutside(buttonRef, () => setShowMoreActions(false));

  const toggleShowMoreActions = () => setShowMoreActions(!showMoreActions);

  return (
    <Wrapper>
      <FlexBetween>
        <Flex>
          <FundButton
            text="Fund"
            expand={expand}
            setExpand={setExpand}
            onFund={() => setShowFund(true)}
            canExpand={funds?.length > 0}
            disabled={!account || isOwner}
          />
        </Flex>
        {account && (
          <div ref={buttonRef}>
            <More className="more" onClick={toggleShowMoreActions} />
            {showMoreActions && (
              <MoreActions>
                <MoreActionItem
                  onClick={() => {
                    setShowMoreActions(false);
                    setShowReport(true);
                  }}
                >
                  <span>Report</span>
                  <img src="/imgs/icons/exclamation.svg" alt="" />
                </MoreActionItem>
              </MoreActions>
            )}
          </div>
        )}
      </FlexBetween>
      {expand && <Funders funds={funds} />}
      <FundModel
        ipfsCid={topicCid}
        beneficiary={topicOwner}
        open={showFund}
        setOpen={setShowFund}
      />
      <ReportModal
        open={showReport}
        setOpen={setShowReport}
        ipfsCid={topicCid}
      />
    </Wrapper>
  );
}
