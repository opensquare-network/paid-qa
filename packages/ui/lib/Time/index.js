import styled from "styled-components";
import timeDuration from "../utils/timeDuration";

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #506176;
`;

export default function Time({ time }) {
  return (
    <Wrapper>{timeDuration(time)}</Wrapper>
  );
}
