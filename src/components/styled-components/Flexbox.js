import styled from "styled-components";

export const Flexbox = styled.div`
  display: flex;
  width: ${props => props.width || "100%"};
  flex-direction: ${props => props.direction || "row"};
  flex-grow: ${props => props.grow || "1"};
  flex-shrink: ${props => props.shrink || "0"};
  flex-wrap: ${props => props.wrap || "nowrap"};
  margin: ${props => props.margin || "1em 0em"};
  align-items: ${props => props.alignItems || "flex-start"};
  align-self: ${props => props.alignSelf || "flex-start"};
  align-content: ${props => props.alignContent || "flex-start"};
  justify-content: ${props => props.justify || "flex-start"};
  gap: ${props => props.gap || "0.5em"};
  flex-wrap: ${props => props.wrap || "no-wrap"};
`;
