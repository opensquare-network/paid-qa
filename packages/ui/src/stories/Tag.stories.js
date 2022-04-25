import React from "react";
import Tag from "../../lib/Tag";

export default {
  title: "Tag",
  component: Tag,
};

export const primary = () => <Tag>10 KSM</Tag>;
export const active = () => <Tag status="active" />;
export const resolved = () => <Tag status="resolved" />;
export const color = () => <Tag color="orange">10 DOT</Tag>;
