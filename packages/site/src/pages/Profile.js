import { useState } from "react";
import styled from "styled-components";

import Header from "components/Profile/Header";
import Container from "components/Container";
import PostList from "components/PostList";
import AnswerList from "components/AnswerList";
import ActivityList from "components/ActivityList";

const ContentWrapper = styled.div`
  margin: 20px 0;
`;

export default function Profile() {
  const [tab, setTab] = useState("questions");

  return (
    <div>
      <Header tab={tab} setTab={setTab} />
      <Container>
        <ContentWrapper>
          {tab === "questions" && <PostList />}
          {tab === "answers" && <AnswerList />}
          {tab === "activity" && <ActivityList />}
        </ContentWrapper>
      </Container>
    </div>
  );
}