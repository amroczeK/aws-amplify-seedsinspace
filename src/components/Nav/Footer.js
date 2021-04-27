import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <Container></Container>;
};

export default Footer;

const Container = styled.div`
  display: flex;
  position: relative;
  bottom: 0;
  height: 5rem;
  width: 100vw;
  max-width:100%;
  opacity: 0.1;
  background: ${({ theme }) => theme.primaryBackground};
`;
