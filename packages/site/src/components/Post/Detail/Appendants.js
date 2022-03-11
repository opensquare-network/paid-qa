import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as AddIcon } from "./icons/add-appendant.svg";

import DividerWrapper from "ui/lib/styled/DividerWrapper";
import RichEdit from "ui/lib/RichEdit";
import Time from "ui/lib/Time";
import IpfsSquare from "ui/lib/IpfsSquare";
import FlexBetween from "ui/lib/styled/FlexBetween";

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

const Title = styled(FlexBetween)`
`;

const AddButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorWrapper = styled.div``;

const Count = styled.div`
  color: #a1a8b3;
`;

export default function Appendants({ appendants, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");
  const onSubmit = () => {
    //TODO: Handle submitting appendant
  };

  const appendantsCount = appendants?.length || 0;
  if (!isOwner && !appendantsCount) {
    return null;
  }

  return (
    <Wrapper>
      <Title>
        <DividerWrapper>
          <div>Appendants</div>
          <Count>{appendantsCount}</Count>
        </DividerWrapper>
        <AddButton onClick={() => setEditing(!editing)}>
          <AddIcon />
        </AddButton>
      </Title>
      {appendants?.map((item, index) => (
        <ItemWrapper key={index}>
          <div>
            <StyledDividerWrapper>
              <div>{`#${index + 1}`}</div>
              <Time time={item.blockTime} />
            </StyledDividerWrapper>
            <IpfsSquare
              href={
                item.pinned ? `https://ipfs.infura.io/ipfs/${item.cid}` : null
              }
            />
          </div>
          <div>{item.content}</div>
        </ItemWrapper>
      ))}
      {editing && (
        <EditorWrapper>
          <RichEdit
            content={content}
            setContent={setContent}
            onSubmit={onSubmit}
            showButtons={true}
          />
        </EditorWrapper>
      )}
    </Wrapper>
  );
}
