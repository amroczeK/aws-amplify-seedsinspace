import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const StyledButton = styled(Button)`
  color: #fff;
  padding: ${props => props.padding || "1em 0"};
  text-transform: none;
`;
