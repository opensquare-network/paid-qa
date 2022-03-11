import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Container from "@osn/common-ui/lib/styled/Container";
// import Explorer from "components/Explorer";
import AskQuestion from "components/NewTopicButton";
import TopicsList from "components/TopicsList";
import Background from "components/Background";
import { setTopics, topicsSelector } from "store/reducers/topicSlice";
import serverApi from "services/serverApi";

const Wrapper = styled.div`
  position: relative;
  padding: 40px 0 64px;
`;

const ContentWrapper = styled.div`
  position: relative;
  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const PostListTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  margin: 0;
`;

export default function Home() {
  const dispatch = useDispatch();
  const topics = useSelector(topicsSelector);
  useEffect(() => {
    serverApi.fetch("/topics").then(({ result, error }) => {
      if (result) {
        dispatch(setTopics(result));
      }
    });
  }, [dispatch]);

  return (
    <Wrapper>
      <Background />
      <Container>
        <ContentWrapper>
          {/* <Explorer /> */}
          <PostListTitle>
            Topics
            <AskQuestion />
          </PostListTitle>
          <TopicsList topics={topics} />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
