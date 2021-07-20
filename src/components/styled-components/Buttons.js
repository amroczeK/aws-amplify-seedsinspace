import styled from "styled-components";
import MUIButton from "@material-ui/core/Button";

export const StyledButton = styled(MUIButton)`
  color: ${props => props.color || "#fff"};
  width: ${props => props.width || "100%"};
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "1em 0"};
  text-transform: none;
`;

const DefaultButton = props => {
  return <MUIButton variant="contained" color="primary" disableElevation {...props} />;
};

export const Button = styled(DefaultButton)`
  color: ${props => props.color || "primary"};
  width: ${props => props.width || "100%"};
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "1em 0"};
  text-transform: none;
`;
