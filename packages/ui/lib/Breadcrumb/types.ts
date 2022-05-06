import React from "react";

export type Route = {
  path: string;
  name: string;
};

export type BreadcrumbProps = {
  children?: React.ReactNode;
  routes?: Route[];
  /**
   * @default true
   */
  showBackButton?: boolean;
  backButtonRender?: (button: React.ReactNode) => React.ReactNode;
  onBack?: () => void;
  /**
   * @default "/"
   */
  separator?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export type BreadcrumbItemProps = Pick<
  BreadcrumbProps,
  "children" | "separator" | "style" | "className"
> & {
  /**
   * @default undefined
   */
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
};
