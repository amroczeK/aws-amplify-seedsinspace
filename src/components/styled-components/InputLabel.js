import InputLabel from "@material-ui/core/InputLabel";
import styled from "styled-components";

export const StyledInputLabel = styled(InputLabel)`
  color: ${props => props.color || "#9E9E9E"};
  font-weight: ${props => props.fontWeight || "bold"};
`;
