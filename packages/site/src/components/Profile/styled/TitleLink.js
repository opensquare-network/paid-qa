import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleLink = styled(Link)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default TitleLink;
