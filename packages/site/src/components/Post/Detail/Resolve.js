import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ResolveModal from "../../ResolveModal";
import { accountSelector } from "store/reducers/accountSlice";
import { calcSponserRewards } from "utils/rewards";
import { Button } from "@osn/common-ui";

const Wrapper = styled.div``;

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
      <Button block onClick={() => setOpen(true)}>
        Resolve
      </Button>
      <ResolveModal
        open={open}
        setOpen={setOpen}
        rewards={sumUpRewards}
        topicCid={topic.cid}
      />
    </Wrapper>
  );
}
