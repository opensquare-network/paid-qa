import NoData from "../../lib/NoData";

export default {
  title: "NoData",
  component: NoData,
};

export const primary = () => <NoData />;

export const withMessagePosts = () => <NoData message="No current posts" />;
