import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primaryBackground};
  font-size: ${(props) => props.fontSize || "0.75em"};
  align-self: ${(props) => props.alignself};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  text-decoration: ${(props) => props.decoration || "none"};
`;
