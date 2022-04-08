import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import {
  p_12_normal,
  p_14_medium,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";
import Button from "@osn/common-ui/lib/styled/Button";
import serverApi from "services/serverApi";
import { accountSelector } from "store/reducers/accountSlice";
import {
  addToast,
  newToastId,
  ToastTypes,
  updateToast,
} from "store/reducers/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signMessage } from "services/chainApi";
import { encodeNetworkAddress } from "@osn/common-ui/lib/utils/address";

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

  p {
    ${p_20_semibold};
    margin-bottom: 8px;
  }
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  input[type="checkbox"] {
    position: relative;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  input[type="checkbox"]:before {
    content: "";
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    top: -6px;
    left: 0;
    border: 1.5px solid #a1a8b3;
    border-radius: 0;
    background-color: white;
  }

  input[type="checkbox"]:hover:before {
    border-color: #506176;
  }

  input[type="checkbox"]:checked:before {
    border-color: blue;
    background-color: blue;
  }

  input[type="checkbox"]:checked:after {
    content: "";
    display: block;
    width: 1px;
    height: 1px;
    border: solid white;
    border-width: 2px 2px 2px 2px;
    position: absolute;
    top: -2px;
    left: 4px;
    background-color: white;
  }

  input {
    flex-basis: 12px;
  }

  label {
    margin-left: 6px;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: calc(100% - 24px);
    ${p_14_medium};
    user-select: none;
    cursor: pointer;
  }

  > div {
    flex-basis: 100%;
  }
`;

const Description = styled.span`
  margin-left: 24px;
  color: #506176;
  ${p_12_normal}
`;

const CloseBar = styled.div`
  display: flex;
  flex-direction: row-reverse;

  > svg path {
    fill: #9da9bb;
  }

  cursor: pointer;
`;

export default function ReportModal({ open, setOpen, ipfsCid }) {
  const dispatch = useDispatch();
  const account = useSelector(accountSelector);

  const [offTopic, setOffTopic] = useState(false);
  const [inappropriate, setInappropriate] = useState(false);
  const [spam, setSpam] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [somethingElse, setSomethingElse] = useState(false);

  const closeButton = (
    <img
      onClick={() => {
        setOpen(false);
      }}
      src="/imgs/icons/close.svg"
      width={24}
      alt=""
    />
  );

  const showErrorToast = (message) => {
    dispatch(
      addToast({
        type: ToastTypes.Error,
        message,
      })
    );
  };

  const report = async () => {
    setOpen(false);

    if (!account) {
      return showErrorToast("Please connect wallet");
    }

    if (!offTopic && !inappropriate && !spam && !duplicate && !somethingElse) {
      return showErrorToast("Please select at least one reason");
    }

    const toastId = newToastId();
    dispatch(
      addToast({
        type: ToastTypes.Pending,
        message: "Waiting for signing...",
        id: toastId,
        sticky: true,
      })
    );

    try {
      const data = {
        ipfsCid,
        offTopic,
        inappropriate,
        spam,
        duplicate,
        somethingElse,
      };
      const msg = JSON.stringify(data);
      const signature = await signMessage(msg, account.address);

      const payload = {
        data,
        address: encodeNetworkAddress(account.address, account.network),
        network: account.network,
        signature,
      };

      dispatch(
        updateToast({
          id: toastId,
          message: "Reporting...",
        })
      );

      const { result, error } = await serverApi.post("/report", payload);
      if (result) {
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Success,
            title: "Thanks for reporting",
            message: "We will review your report and take action if there is a violation of Paid QA Guidelines.",
          })
        );
      }

      if (error) {
        dispatch(
          updateToast({
            id: toastId,
            type: ToastTypes.Error,
            message: error.message,
          })
        );
      }
    } catch (e) {
      dispatch(
        updateToast({
          id: toastId,
          type: ToastTypes.Error,
          message: e.toString(),
        })
      );
    } finally {
      dispatch(
        updateToast({
          id: toastId,
          sticky: false,
        })
      );
    }
  };

  return (
    <Wrapper>
      <StyledModal open={open} dimmer size="tiny">
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <p>Report</p>
          <Form>
            <input
              type="checkbox"
              id="checkbox_1"
              onChange={(e) => setOffTopic(e.target.value === "on")}
            />
            <label htmlFor="checkbox_1">Off-topic</label>
            <input
              type="checkbox"
              id="checkbox_2"
              onChange={(e) => setInappropriate(e.target.value === "on")}
            />
            <label htmlFor="checkbox_2">Inappropriate</label>
            <input
              type="checkbox"
              id="checkbox_3"
              onChange={(e) => setSpam(e.target.value === "on")}
            />
            <label htmlFor="checkbox_3">Spam</label>
            <input
              type="checkbox"
              id="checkbox_4"
              onChange={(e) => setDuplicate(e.target.value === "on")}
            />
            <label htmlFor="checkbox_4">Duplicate</label>
            <input
              type="checkbox"
              id="checkbox_5"
              onChange={(e) => setSomethingElse(e.target.value === "on")}
            />
            <label htmlFor="checkbox_5">Something else</label>
            <Description>
              This content requires attention for another reason not listed
              above.
            </Description>
            <Flex style={{ justifyContent: "end" }}>
              <Button primary onClick={report}>
                Submit
              </Button>
            </Flex>
          </Form>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
