import Graph from "./Graph";
import Table from "./Table";
import styled from "styled-components";

const GraphAndTable = () => {
  return (
    <DataContainer>
      <Graph />
      <Table />
    </DataContainer>
  );
};

export default GraphAndTable;

const DataContainer = styled.div`
  padding-top: 2rem;
  position: relative;
  height: 100%;
`;