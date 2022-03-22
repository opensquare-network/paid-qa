import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResolveModal from "../../ResolveModal";
import { accountSelector } from "store/reducers/accountSlice";
import { calcSponserRewards } from "utils/rewards";

const Wrapper = styled.div``;

const ResolveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;

  height: 48px;

  border: 1px solid #b7c0cc;
  box-sizing: border-box;

  cursor: pointer;
`;

export default function Resolve({ topic }) {
  const [open, setOpen] = useState();
  const account = useSelector(accountSelector);
  const sumUpRewards = calcSponserRewards(
    topic.rewards.filter((item) => item.sponsor === account?.address)
  );
  const reward = sumUpRewards[0];

  return (
    <Wrapper>
      {reward && (
        <ResolveButton onClick={() => setOpen(true)}>Resolve</ResolveButton>
      )}
      <ResolveModal
        open={open}
        setOpen={setOpen}
        reward={reward}
        topicCid={topic.cid}
      />
    </Wrapper>
  );
}
