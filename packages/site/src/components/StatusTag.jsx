import { Tag } from "@osn/common-ui";

const statusColors = {
  active: "purple",
  resolved: "gray",
};

export default function StatusTag({ status }) {
  return (
    <Tag color={statusColors[status]} style={{ textTransform: "capitalize" }}>
      {status}
    </Tag>
  );
}
