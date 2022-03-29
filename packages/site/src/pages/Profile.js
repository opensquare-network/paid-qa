import { useState } from "react";
import styled from "styled-components";

import Header from "components/Profile/Header";
import Container from "@osn/common-ui/lib/styled/Container";
import TopicsList from "components/Profile/TopicsList";
import AnswerList from "components/AnswerList";
import ActivityList from "components/ActivityList";
import { useParams } from "react-router";

const ContentWrapper = styled.div`
  margin: 20px 0;
`;

export default function Profile() {
  const { network, address } = useParams();
  const [tab, setTab] = useState("posts");

  return (
    <div>
      <Header network={network} address={address} tab={tab} setTab={setTab} />
      <Container>
        <ContentWrapper>
          {tab === "posts" && <TopicsList network={network} address={address} />}
          {tab === "replies" && <AnswerList />}
          {tab === "analytics" && <ActivityList />}
        </ContentWrapper>
      </Container>
    </div>
  );
}
