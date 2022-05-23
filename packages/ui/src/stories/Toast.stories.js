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
            message: "Sit sed nulla rhoncus pellentesque.",
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
            message: "Sit sed nulla rhoncus pellentesque.",
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
            message: "Waiting for signing and syncing data...",
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
            message: "Sit sed nulla rhoncus pellentesque.",
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
            message: "Sit sed nulla rhoncus pellentesque.",
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
