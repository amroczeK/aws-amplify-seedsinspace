import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export const StyledTypographyDark = styled(Typography)`
  font-weight: ${(props) => props.fontWeight || "none"};
  font-style: ${(props) => props.fontStyle || "none"};
  color: ${({ theme }) => theme.primaryDark};
`;

export const StyledTypographyLight = styled(Typography)`
  font-weight: ${(props) => props.fontWeight || "none"};
  font-style: ${(props) => props.fontStyle || "none"};
  color: ${({ theme }) => theme.primaryLight};
`;
