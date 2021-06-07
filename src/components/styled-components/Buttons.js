import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const StyledButton = styled(Button)`
  color: ${props => props.color || "#fff"};
  width: ${props => props.width || "100%"};
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "1em 0"};
  text-transform: none;
`;
