import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Flex from "../styled/Flex";
import { MOBILE_SIZE } from "@osn/common/src/utils/constants";
import LogoImg from "../imgs/opensquare-logo.svg";
import LogoIcon from "../imgs/opensquare-logo-icon.svg";

const Wrapper = styled.header`
  position: relative;
  flex: 0 0 auto;
  background: #ffffff;
  border-bottom: solid 1px #f0f3f8;
`;

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: 80px;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    min-height: 62px;
    padding: 15px 20px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 200px;
  height: 36px;
  background-image: url("${LogoImg}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    width: 48px;
    height: 32px;
    background-image: url("${LogoIcon}");
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background: #e2e8f0;
`;

const ChildWrapper = styled(Flex)`
  flex: 1;
`;

export default function Header({ children }) {
  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <NavLink to="/">
            <Logo />
          </NavLink>
          {children && <Divider />}
        </LogoWrapper>

        {children && <ChildWrapper>{children}</ChildWrapper>}
      </ContentWrapper>
    </Wrapper>
  );
}
