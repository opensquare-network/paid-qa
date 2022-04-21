import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResolveModal from "../../ResolveModal";
import { accountSelector } from "store/reducers/accountSlice";
import { calcSponserRewards } from "utils/rewards";
import Button from "@osn/common-ui/lib/styled/Button";

const Wrapper = styled.div``;

const ResolveButton = styled(Button)`
  padding: 11px 24px;
  width: 100%;
  box-sizing: border-box;
`;

export default function Resolve({ topic }) {
  const [open, setOpen] = useState();
  const account = useSelector(accountSelector);
  const sumUpRewards = calcSponserRewards(
    topic.rewards.filter((item) => item.sponsor === account?.address)
  );

  if (!sumUpRewards?.length > 0) {
    return null;
  }

  const myResolve = topic?.resolves?.find(
    (resolve) =>
      resolve.sponsor === account.address && resolve.network === account.network
  );

  if (myResolve) {
    return null;
  }

  return (
    <Wrapper>
      <ResolveButton onClick={() => setOpen(true)}>Resolve</ResolveButton>
      <ResolveModal
        open={open}
        setOpen={setOpen}
        rewards={sumUpRewards}
        topicCid={topic.cid}
      />
    </Wrapper>
  );
}
