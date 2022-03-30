import styled from "styled-components";
import { Link } from "react-router-dom";
import { p_16_normal } from "@osn/common-ui/lib/styles/textStyles";

const Wrapper = styled.div`
  display: flex;
  ${p_16_normal};
  color: #04d2c5;
  cursor: pointer;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;

export default function NewTopicButton() {
  return (
    <Link to={"/new"}>
      <Wrapper>
        <img src="/imgs/icons/add.svg" alt="" />
        New Topic
      </Wrapper>
    </Link>
  );
}
