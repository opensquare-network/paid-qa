import Card from "../../lib/styled/Card";
import styled from "styled-components";

export default {
  title: "Card",
  component: Card,
};

const StyledCard = styled(Card)`
  background-color: #fee2e2;
  color: #ef4444;
`;

export const primary = () => <Card>Card content</Card>;
export const styledCard = () => <StyledCard>Card content</StyledCard>;
