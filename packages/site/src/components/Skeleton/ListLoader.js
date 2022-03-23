import { useWindowSize } from "@osn/common-ui/lib/utils/hooks";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  svg {
    background: white;
    box-shadow: 0 4px 31px rgba(26, 33, 44, 0.04),
      0 0.751293px 3.88168px rgba(26, 33, 44, 0.03);
    margin-bottom: 15px;
  }
`;

const MyLoader = (props) => {
  const windowSize = useWindowSize();
  const loaderWidth = windowSize.width > 1144 ? 1080 : windowSize.width - 64;
  if (isNaN(loaderWidth)) {
    return null;
  }
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={153}
      viewBox={`0 0 ${loaderWidth} 153`}
      backgroundColor="#f3f3f3"
      foregroundColor="#EFF3F9"
      {...props}
    >
      <rect x="24" y="28" rx="3" ry="3" width="1032" height="16" />
      <rect x="24" y="52" rx="3" ry="3" width="178" height="16" />
      <rect x="24" y="88" rx="3" ry="3" width="1032" height="1" />
      <circle cx="36" cy="118" r="12" />
      <rect x="56" y="109" rx="3" ry="3" width="128" height="16" />
    </ContentLoader>
  );
};

const ListLoader = () => {
  return (
    <LoaderWrapper>
      <ListLoader />
      <ListLoader />
      <ListLoader />
      <ListLoader />
      <ListLoader />
    </LoaderWrapper>
  );
};

export default ListLoader;
