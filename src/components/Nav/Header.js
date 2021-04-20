import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <h1>SEEDS IN SPACE</h1>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 8rem;
  width: 100%;
  background: ${({ theme }) => theme.primaryBackground};
  justify-content: center;
  align-items: center;
`;
