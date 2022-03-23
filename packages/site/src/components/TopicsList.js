import styled from "styled-components";
import Topic from "components/Topic";
import NoPost from "./NoPost";
import ListLoader from "./Skeleton/ListLoader";

const Wrapper = styled.div``;

export default function TopicsList({ topics }) {
  return (
    <Wrapper>
      {topics === null ? (
        <ListLoader />
      ) : topics.items.length === 0 ? (
        <NoPost message={"No current topics"} />
      ) : (
        topics.items.map((topic, index) => <Topic key={index} topic={topic} />)
      )}
    </Wrapper>
  );
}
