import React from "react";
import Container from "@material-ui/core/Container";
import Graph from "../components/AllSeeds/Graph"
import Table from "../components/AllSeeds/Table";
import styled from "styled-components";

const AllSeeds = () => {
  return (
    <Container>
      <Section>
        <h1>Community Seeds</h1>
        <DataContainer>
          <Graph />
          <Table />
        </DataContainer>
      </Section>
    </Container>
  );
};

export default AllSeeds;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 1em;
  padding: 1.5rem;
`;

const DataContainer = styled.div`
  position: relative;
  height: 100%;
`;
