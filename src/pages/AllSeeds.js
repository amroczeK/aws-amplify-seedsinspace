import React from "react";
import Container from "@material-ui/core/Container";
import Graph from "../components/AllSeeds/Graph";
import Table from "../components/AllSeeds/Table";
import styled from "styled-components";

const AllSeeds = () => {
  return (
    <Container maxWidth="xl">
      <h1>Community Seeds</h1>
      <DataContainer>
        <Graph />
        <Table />
      </DataContainer>
    </Container>
  );
};

export default AllSeeds;

const DataContainer = styled.div`
  position: relative;
  height: 100%;
`;
