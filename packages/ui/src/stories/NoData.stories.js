import NoData from "../../lib/NoData";
import styled from "styled-components";

export default {
  title: "NoData",
  component: NoData,
};

const BorderWrapper = styled.div`
  border: 1px solid #f0f3f8;
`;

export const primary = () => <NoData />;

export const withMessagePosts = () => <NoData message="No current posts" />;

export const withBorderWrapper = () => (
  <BorderWrapper>
    <NoData />
  </BorderWrapper>
);
