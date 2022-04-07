import styled from "styled-components";

const Wrapper = styled.span`
  padding: 2px 12px;
  text-transform: capitalize;
  color: white;
`;

const getColor = (tag) => {
  switch (tag) {
    case "active":
      return "#6848FF";
    default:
      return "#E2E8F0";
  }
};

export default function Tag({ children }) {
  return (
    <Wrapper style={{ backgroundColor: getColor(children) }}>
      {" "}
      {children}
    </Wrapper>
  );
}
