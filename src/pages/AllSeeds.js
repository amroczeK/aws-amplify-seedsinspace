import React from "react";
import Graph from "../components/AllSeeds/Graph"
import Table from "../components/AllSeeds/Table";
import styled from "styled-components";

const AllSeeds = () => {
  return (
    <Container>
      <DataContainer>
        <Graph />
        <Table />
      </DataContainer>
    </Container>
  );
};

export default AllSeeds;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 1em;
  padding: 1.5rem;
`;

const DataContainer = styled.div`
  padding-top: 2rem;
  position: relative;
  height: 100%;
`;
