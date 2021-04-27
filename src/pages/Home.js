import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <h1>HOME</h1>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  max-width: 100%;
  padding: 1rem;
`;
