import React from "react";

export type ListProps = {
  /**
   * @requires
   */
  data: any[];
  /**
   * @requires
   */
  itemRender(item: any, index: number): React.ReactNode;
  /**
   * list item gap for <List.Item>
   */
  gap?: number;
  /**
   * if no data(data.length equals to 0)
   */
  noDataMessage?: string;
  /**
   * @default false
   */
  loading?: boolean;
};

export type ListItemProps = {
  gap?: ListProps["gap"];
  children?: React.ReactNode;
};
