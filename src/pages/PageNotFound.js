import React from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { StyledButton } from "../components/styled-components/Buttons";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <Container maxWidth="md">
      <Content>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>We can’t find the page you’re looking for.</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <StyledButton
            disableElevation
            variant="contained"
            color="primary"
            width="300px"
          >
            BACK TO HOME
          </StyledButton>
        </Link>
      </Content>
    </Container>
  );
};

export default PageNotFound;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  h1 {
    font-size: 7rem;
    margin: 0px;
  }
  h2 {
    font-size: 2.5rem;
    margin: 0px;
  }
  p {
    font-size: 2rem;
    margin: 0px
    margin-bottom: 1rem;
  }
`;
