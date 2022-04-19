import styled from "styled-components";
import timeDuration from "@osn/common/src/utils/timeDuration";

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #a1a8b3;
`;

export default function Time({ time }) {
  return <Wrapper>{timeDuration(time)}</Wrapper>;
}
