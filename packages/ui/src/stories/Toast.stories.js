import styled from "styled-components";
import Button from "../../lib/styled/Button";
import { createToast, destroyAllToast } from "../../lib/Toast";

export default {
  title: "Toast",
};

const DemoWrapper = styled.div`
  button {
    margin: 0 1rem 1rem 0;
  }
`;

export const primary = () => {
  return (
    <DemoWrapper>
      <Button
        onClick={() => {
          createToast({
            title: "Default",
            message: "Message",
          });
        }}
      >
        Default
      </Button>
      <br />
      <Button
        onClick={() => {
          createToast({
            title: "Success",
            message: "Message",
            type: "success",
          });
        }}
      >
        Success
      </Button>
      <br />
      <Button
        onClick={() => {
          createToast({
            title: "Pending",
            message: "Message",
            type: "pending",
          });
        }}
      >
        Pending
      </Button>
      <br />
      <Button
        onClick={() => {
          createToast({
            title: "Error",
            message: "Message",
            type: "error",
          });
        }}
      >
        Error
      </Button>
      <br />
      <Button
        onClick={() => {
          createToast({
            title: "Info",
            message: "Message",
            type: "info",
          });
        }}
      >
        Info
      </Button>
      <br />
      <Button primary onClick={destroyAllToast}>
        Destroy All
      </Button>
    </DemoWrapper>
  );
};
