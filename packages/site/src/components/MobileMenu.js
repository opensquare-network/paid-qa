import styled from "styled-components";
import { useState } from "react";
import { p_14_medium } from "../styles/textStyles";

const Wrapper = styled.div``;

const FloatingWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  z-index: 1;
  padding: 20px;

  * {
    margin: 0;
    display: block;
    ${p_14_medium};
    line-height: 40px;
    color: #1e2134;
  }

  > :not(:last-child) {
    border-bottom: 1px solid #f0f3f8;
  }
`;

function MobileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Wrapper
      onClick={() => {
        setShowMenu(!showMenu);
      }}
    >
      <img src={`/imgs/icons/${showMenu ? "close" : "menu"}.svg`} alt="" />
      {showMenu && (
        <FloatingWrapper>
          <a href="https://voting.opensquare.io/">Off-chain Voting</a>
          <p>Paid QA</p>
        </FloatingWrapper>
      )}
    </Wrapper>
  );
}

export default MobileMenu;
