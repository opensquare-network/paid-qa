// not ready for public
import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const ListWrapper = styled.ul`
  padding: 0;
`;

function List(props) {
  const { children, data = [], gap, itemRender, ...restProps } = props;

  if (typeof itemRender !== "function") {
    return null;
  }

  return (
    <ListWrapper {...restProps}>
      {data?.map((item, index) =>
        React.cloneElement(itemRender(item, index), { key: index, gap })
      )}
    </ListWrapper>
  );
}

List.Item = ListItem;

export default List;
