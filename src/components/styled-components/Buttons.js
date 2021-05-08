import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.secondaryLight};
  color: ${({ theme }) => theme.primaryLight};
  padding: ${(props) => props.padding || "1em 0"};
  text-transform: none;
`;
