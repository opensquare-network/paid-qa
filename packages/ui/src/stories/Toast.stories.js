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
            type: "Sit sed nulla rhoncus pellentesque.",
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
            type: "Sit sed nulla rhoncus pellentesque.",
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
            type: "Sit sed nulla rhoncus pellentesque.",
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
            type: "Sit sed nulla rhoncus pellentesque.",
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
