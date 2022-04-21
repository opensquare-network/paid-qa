import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import styled from "styled-components";
import {
  p_14_normal,
  p_16_semibold,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import { useApi } from "utils/hooks";
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
import serverApi from "services/serverApi";
import PromiseItem, {
  useAverageFulfillment,
  useFulfillment,
} from "./Post/Promises/Item";
import { fetchTopic } from "store/reducers/topicSlice";
import { useIsMounted } from "@osn/common/src/utils/hooks";
import FlexBetween from "@osn/common-ui/lib/styled/FlexBetween";
import { useEffect, useState } from "react";

const { InteractionEncoder } = encoder;
const { ResolveInteraction } = interactions;

const Wrapper = styled.div``;

const StyledModal = styled(Modal)`
  max-width: 400px !important;
  border-radius: 0 !important;
`;

const StyledCard = styled.div`
  margin: 0 !important;
  padding: 24px !important;
  position: relative !important;
  width: 100% !important;
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 28px;
`;

const StyledTitle = styled.header`
  ${p_20_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

const Info = styled.div`
  ${p_14_normal};
  color: #506176;
`;

const ItemTitle = styled(FlexBetween)`
  margin: 8px 0px;
`;

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

export default function ResolveModal({ open, setOpen, rewards, topicCid }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const isMounted = useIsMounted();
  const api = useApi();
  const percentage = useAverageFulfillment(rewards);

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

    const interaction = new ResolveInteraction(topicCid);
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

      const { result, error } = await serverApi.post(`/resolve`, payload);
      if (result) {
        dispatch(newSuccessToast("Successfully resolved"));
        dispatch(fetchTopic(topicCid));
      }

      if (error) {
        dispatch(newErrorToast(error.message));
      }
    } catch (e) {
      dispatch(newErrorToast(e.message));
    } finally {
      dispatch(removeToast(toastId));
    }
  };

  const closeModal = () => setOpen(false);

  const closeButton = (
    <img onClick={closeModal} src="/imgs/icons/close.svg" width={24} alt="" />
  );

  return (
    <Wrapper>
      <StyledModal open={open} dimmer onClose={closeModal} size="tiny">
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <StyledTitle>Resolve</StyledTitle>

          {percentage !== 100 && (
            <Info>If promise is not kept, credit score will be affected.</Info>
          )}

          <ItemTitle>
            <StyledText>My promise</StyledText>
          </ItemTitle>
          {rewards?.map((reward, index) => (
            <PromiseItem key={index} reward={reward} />
          ))}
          <ActionBar>
            <Button primary onClick={doConfirm}>
              Confirm
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
