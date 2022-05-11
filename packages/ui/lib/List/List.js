import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import NoData from "../NoData";

const ListWrapper = styled.ul`
  padding: 0;
`;

function List(props) {
  const {
    children,
    data = [],
    gap,
    itemRender,
    noDataMessage,
    ...restProps
  } = props;

  if (typeof itemRender !== "function") {
    return null;
  }

  return (
    <ListWrapper {...restProps}>
      {data?.length ? (
        data?.map((item, index) =>
          React.cloneElement(itemRender(item, index), { key: index, gap })
        )
      ) : (
        <NoData message={noDataMessage} />
      )}
    </ListWrapper>
  );
}

List.Item = ListItem;

export default List;
