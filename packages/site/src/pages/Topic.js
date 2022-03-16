import { useParams } from "react-router";
import styled from "styled-components";

import Background from "components/Background";
import Container from "@osn/common-ui/lib/styled/Container";
import Breadcrumb from "@osn/common-ui/lib/Navi/Breadcrumb";
import Post from "components/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import serverApi from "services/serverApi";
import { setTopic, topicSelector } from "store/reducers/topicSlice";

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

export default function Topic() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const topic = useSelector(topicSelector);
  useEffect(() => {
    dispatch(setTopic(""));
    serverApi.fetch(`/topics/${cid}`).then(({ result }) => {
      if (result) {
        dispatch(setTopic(result));
      }
    });
  }, [dispatch, cid]);

  //TODO: implement loading effect
  if (!topic) {
    return null;
  }

  return (
    <Wrapper>
      <Background />
      <Container>
        <ContentWrapper>
          <Breadcrumb value="Topic" />
          <Post topic={topic} />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}
