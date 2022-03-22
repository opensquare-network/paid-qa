import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../store/reducers/accountSlice";

import { Modal } from "semantic-ui-react";
import Button from "@osn/common-ui/lib/styled/Button";
import styled from "styled-components";
import { p_16_semibold, p_20_semibold } from "../styles/textStyles";
import { useApi } from "utils/hooks";
import { encoder, interactions } from "@paid-qa/spec";
import { submitRemark } from "services/chainApi";
import { addToast, ToastTypes } from "store/reducers/toastSlice";
import serverApi from "services/serverApi";
import PromiseItem, { useFulfillment } from "./Post/Promises/Item";
import { fetchTopic } from "store/reducers/topicSlice";

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
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #506176;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0px;
`;

const StyledText = styled.p`
  ${p_16_semibold};
  color: #1e2134;
  margin-bottom: 8px;
`;

export default function ResolveModal({ open, setOpen, reward, topicCid }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const [, precent] = useFulfillment(reward);

  const showErrorToast = (message) => {
    dispatch(
      addToast({
        type: ToastTypes.Error,
        message,
      })
    );
    setOpen(false);
  };

  const doConfirm = async () => {
    if (!api) {
      return showErrorToast("Network not connected yet");
    }

    const interaction = new ResolveInteraction(topicCid);
    if (!interaction.isValid) {
      return showErrorToast("Interaction is invalid");
    }
    const remark = new InteractionEncoder(interaction).getRemark();

    try {
      setLoading(true);

      const { blockHash, extrinsicIndex } = await submitRemark(api, remark, account);
      const payload = {
        network: account.network,
        blockHash,
        extrinsicIndex,
      };

      serverApi
        .post(`/resolve`, payload)
        .then(({ result, error }) => {
          if (result) {
            dispatch(fetchTopic(topicCid));
          }

          if (error) {
            showErrorToast(error.message);
          }
        });
    } catch (e) {
      if (e.toString() === "Error: Cancelled") {
        return;
      }
      return showErrorToast(e.toString());
    } finally {
      setLoading(false);
    }

    setOpen(false);
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

          {precent !== 100 && (
            <Info>If promise is not kept, credit score will be affected.</Info>
          )}

          <ItemTitle>
            <StyledText>My promise</StyledText>
          </ItemTitle>
          {reward && <PromiseItem reward={reward} />}
          <ActionBar>
            <Button isLoading={loading} primary onClick={doConfirm}>
              Confirm
            </Button>
          </ActionBar>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
