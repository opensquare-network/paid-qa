import styled from "styled-components";
import ContentLoader from "react-content-loader";
import Topic from "components/Topic";

const Wrapper = styled.div`
  svg {
    box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.04),
      0px 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
  }
`;

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={131}
    viewBox="0 0 1080 131"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="180" y="24" rx="3" ry="3" width="100%" height="6" />
    <rect x="180" y="88" rx="3" ry="3" width="178" height="6" />
    <rect x="20" y="20" rx="3" ry="3" width="80" height="80" />
  </ContentLoader>
);

export default function TopicsList({ topics }) {
  //TODO: show empty placeholder for no topics
  return (
    <Wrapper>
      {!topics ? (
        <MyLoader />
      ) : (
        topics?.items.map((topic, index) => <Topic key={index} topic={topic} />)
      )}
    </Wrapper>
  );
}
