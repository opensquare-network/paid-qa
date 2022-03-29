import { useState } from "react";
import styled from "styled-components";

import Header from "components/Profile/Header";
import Container from "@osn/common-ui/lib/styled/Container";
import TopicsList from "components/Profile/TopicsList";
import AnswerList from "components/Profile/AnswerList";
import { useParams } from "react-router";

const ContentWrapper = styled.div`
  margin: 20px 0;
  .markdown-content {
    max-width: initial;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default function Profile() {
  const { network, address } = useParams();
  const [tab, setTab] = useState("posts");

  return (
    <div>
      <Header network={network} address={address} tab={tab} setTab={setTab} />
      <Container>
        <ContentWrapper>
          {tab === "posts" && (
            <TopicsList network={network} address={address} />
          )}
          {tab === "replies" && (
            <AnswerList network={network} address={address} />
          )}
        </ContentWrapper>
      </Container>
    </div>
  );
}
