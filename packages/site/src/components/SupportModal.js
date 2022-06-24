import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";
import BigNumber from "bignumber.js";

import Modal from "@osn/common-ui/lib/Modal";
import styled from "styled-components";
import { useApi } from "utils/hooks";
import serverApi from "services/serverApi";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import {
  newErrorToast,
  newPendingToast,
  newSuccessToast,
  newToastId,
  removeToast,
  updatePendingToast,
} from "store/reducers/toastSlice";
import { fetchTopic } from "store/reducers/topicSlice";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import {
  p_14_normal,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import SupportDetail from "./SupportDetail";
import {
  DEFAULT_MINIMUM_FUND_AMOUNT,
  MINIMUM_FUND_AMOUNTS,
} from "utils/constants";

const { InteractionEncoder } = encoder;
const { SupportInteraction } = interactions;

const Wrapper = styled.div``;

const StyledTitle = styled.header`
  ${p_20_semibold};
  line-height: 28px;
  color: #1e2134;
  margin-bottom: 8px;
`;

const StyledDescription = styled.p`
  ${p_14_normal};
  margin-bottom: 0.5rem;
  color: #506176;
`;

export default function SupportModal({ open, setOpen, topicCid }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [tokenIdentifier, setTokenIdentifier] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [symbol, setSymbol] = useState("");
  const api = useApi();
  const isMounted = useIsMounted();

  const showErrorToast = (message) => {
    dispatch(newErrorToast(message));
    if (isMounted.current) {
      setOpen(false);
    }
  };

  const doConfirm = async () => {
    setOpen(false);

    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!api) {
      return showErrorToast("Network not connected yet");
    }

    if (!tokenIdentifier) {
      return showErrorToast("Token/Asset is missing");
    }

    if (!inputAmount) {
      return showErrorToast("Amount is missing");
    }

    if (new BigNumber(inputAmount).isNaN()) {
      return showErrorToast("Amount is invalid");
    }

    const minimum = MINIMUM_FUND_AMOUNTS[symbol] || DEFAULT_MINIMUM_FUND_AMOUNT;
    if (new BigNumber(inputAmount).lt(minimum)) {
      return showErrorToast(
        `Support amount cannot be less than minimum: ${minimum}`
      );
    }

    const interaction = new SupportInteraction(
      tokenIdentifier,
      inputAmount,
      topicCid
    );
    if (!interaction.isValid) {
      return showErrorToast("Interaction is invalid");
    }
    const remark = new InteractionEncoder(interaction).getRemark();

    const toastId = newToastId();
    dispatch(newPendingToast(toastId, "Waiting for signing..."));

    try {
      const { blockHash, extrinsicIndex } = await submitRemark(
        api,
        remark,
        account,
        (status) => {
          dispatch(updatePendingToast(toastId, status));
        }
      );
      const payload = {
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      const { result, error } = await serverApi.post(
        `/topics/${topicCid}/supports`,
        payload
      );
      if (result) {
        dispatch(newSuccessToast("Support added"));
        isMounted.current && dispatch(fetchTopic(topicCid));
      }
      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } catch (e) {
      dispatch(newErrorToast(`Failed to add support. ${e.message}`));
    } finally {
      dispatch(removeToast(toastId));
    }
  };

  return (
    <Wrapper>
      <Modal
        open={open}
        setOpen={setOpen}
        okText="Confirm"
        disableButton={!symbol || !inputAmount}
        onOk={doConfirm}
      >
        <StyledTitle>Promise</StyledTitle>
        <StyledDescription>
          Support the topic and promise rewards for answers. No need to deduct
          or lock up assets.
        </StyledDescription>

        <SupportDetail
          tokenIdentifier={tokenIdentifier}
          setTokenIdentifier={setTokenIdentifier}
          inputAmount={inputAmount}
          setInputAmount={setInputAmount}
          symbol={symbol}
          setSymbol={setSymbol}
        />

        <StyledDescription>
          Promise amount is not limited by the balance.
        </StyledDescription>
      </Modal>
    </Wrapper>
  );
}
