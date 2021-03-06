import { ReactNode } from "react";

export type CardProps = React.HTMLAttributes<{
  children: ReactNode;
  title: ReactNode;
  extra: ReactNode;
  head: ReactNode;
  size: "small" | undefined;
  shadow: boolean;
  bordered: boolean;
  prefix: ReactNode;
  suffix: ReactNode;
}>;
