import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import {
  p_12_normal,
  p_14_medium,
  p_20_semibold,
} from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";
import Button from "@osn/common-ui/lib/styled/Button";

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

const Form = styled.form`
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

export default function ReportModal({ open, setOpen }) {
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

  return (
    <Wrapper>
      <StyledModal open={open} dimmer size="tiny">
        <StyledCard>
          <CloseBar>{closeButton}</CloseBar>
          <p>Report</p>
          <Form>
            <input type="checkbox" id="checkbox_1" />
            <label htmlFor="checkbox_1">Off-topic</label>
            <input type="checkbox" id="checkbox_2" />
            <label htmlFor="checkbox_2">Inappropriate</label>
            <input type="checkbox" id="checkbox_3" />
            <label htmlFor="checkbox_3">Spam</label>
            <input type="checkbox" id="checkbox_4" />
            <label htmlFor="checkbox_4">Duplicate</label>
            <input type="checkbox" id="checkbox_5" />
            <label htmlFor="checkbox_5">Something else</label>
            <Description>
              This content requires attention for another reason not listed
              above.
            </Description>
            <Flex style={{ justifyContent: "end" }}>
              <Button primary>Submit</Button>
            </Flex>
          </Form>
        </StyledCard>
      </StyledModal>
    </Wrapper>
  );
}
