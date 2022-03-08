import styled from "styled-components";

import Topic from "components/Topic";

const Wrapper = styled.div`
`;

export default function TopicsList({ topics }) {
  //TODO: show empty placeholder for no topics
  return (
    <Wrapper>
      {topics?.items.map((topic, index) => (
        <Topic key={index} topic={topic} />
      ))}
    </Wrapper>
  );
}
