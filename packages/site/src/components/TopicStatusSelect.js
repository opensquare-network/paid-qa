import styled from "styled-components";
import DropdownSelector from "@osn/common-ui/lib/DropdownSelector";

const Wrapper = styled.div`
  > div div {
    z-index: 10;
  }
`;

const Types = [
  {
    id: "all",
    name: "All Types",
  },
  {
    id: "active",
    name: "Active",
  },
  {
    id: "resolved",
    name: "Resolved",
  },
];

export default function TopicStatusSelector({ status, setStatus }) {
  const options = Types.map((item, i) => {
    return {
      key: i,
      value: item.id,
      content: item.name,
    };
  });

  return (
    <Wrapper>
      <DropdownSelector
        options={options}
        value={status || "all"}
        onSelect={setStatus}
      />
    </Wrapper>
  );
}
