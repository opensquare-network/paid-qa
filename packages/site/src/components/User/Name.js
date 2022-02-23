import styled from "styled-components";

const Wrapper = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default function Name({ address }) {
  return (
    <Wrapper>
      {address.substring(0, 4)}...
      {address.substring(address.length - 4, address.length)}
    </Wrapper>
  );
}
