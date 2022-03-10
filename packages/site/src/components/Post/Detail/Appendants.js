import styled from "styled-components";

import DividerWrapper from "ui/lib/styled/DividerWrapper";

const Wrapper = styled.div`
  > :first-child {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const ItemWrapper = styled.div`
  > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > :nth-child(2) {
    margin-top: 4px;
    font-size: 14px;
    line-height: 24px;
    color: #506176;
  }
`;

const StyledDividerWrapper = styled(DividerWrapper)`
  font-size: 14px;
  line-height: 24px;
  > :first-child {
    font-weight: 500;
  }
  > :nth-child(2) {
    color: #a1a8b3;
  }
`;

export default function Appendants({ appendants }) {
  if (!appendants || appendants.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <div>Appendants</div>
      <ItemWrapper>
        <div>
          <StyledDividerWrapper>
            <div>#1</div>
            <div>12 hours ago</div>
          </StyledDividerWrapper>
          <img src="/imgs/icons/ipfs.svg" alt="" />
        </div>
        <div>
          Velit amet auctor feugiat consectetur malesuada suspendisse facilisi.
          Eget fringilla eu semper vivamus morbi nunc arcu pellentesque ac.
        </div>
      </ItemWrapper>
      <ItemWrapper>
        <div>
          <StyledDividerWrapper>
            <div>#2</div>
            <div>12 hours ago</div>
          </StyledDividerWrapper>
          <img src="/imgs/icons/ipfs.svg" alt="" />
        </div>
        <div>
          Velit amet auctor feugiat consectetur malesuada suspendisse facilisi.
          Eget fringilla eu semper vivamus morbi nunc arcu pellentesque ac.
        </div>
      </ItemWrapper>
    </Wrapper>
  );
}
