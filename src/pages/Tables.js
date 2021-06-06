import React, { useState, useEffect } from "react";
import { DataGridTable } from "../components/tables/data-grid";
import styled from "styled-components";

const defaultColumns = [
  { field: "name", headerName: "Name", width: 120 },
  { field: "type", headerName: "Type", width: 120 },
  { field: "school", headerName: "School", width: 120 },
  { field: "stemLength", headerName: "Stem Length (mm)", type: "number", width: 200 },
  { field: "leafLength", headerName: "Leaf Length (mm)", type: "number", width: 200 },
  { field: "leafWidth", headerName: "Leaf Width (mm)", type: "number", width: 200 },
  { field: "leafColour", headerName: "Leaf Colour", width: 160 },
  { field: "leafCount", headerName: "Leaf Count", type: "number", width: 160 },
  { field: "temperature", headerName: "Temperature (C)", type: "number", width: 200 },
  { field: "humidity", headerName: "Humidify (%)", type: "number", width: 140 },
  { field: "volume", headerName: "Water Volume (mL)", type: "number", width: 200 },
  { field: "phLevel", headerName: "PH Level", type: "number", width: 140 },
];

const defaultRowData = [
  {
    id: 1,
    name: "Oregano",
    type: "Earth",
    school: "Emmanuel Catholic College",
    stemLength: 3.2,
    leafLength: 3.1,
    leafWidth: 4.2,
    leafColour: "Green",
    leafCount: 2,
    temperature: 16,
    humidity: 30,
    volume: 60,
    phLevel: 5,
  },
  {
    id: 2,
    name: "Oregano",
    type: "Space",
    school: "Emmanuel Catholic College",
    stemLength: 2.2,
    leafLength: 2.1,
    leafWidth: 3.2,
    leafColour: "Yellow",
    leafCount: 2,
    temperature: 16,
    humidity: 30,
    volume: 60,
    phLevel: 7,
  },
];

const Tables = () => {
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setRowData(defaultRowData);
  }, []);

  return (
    <Container>
      <TableContainer>
        <DataGridTable
          rowData={rowData}
          defaultColumns={defaultColumns}
          loading={loading}
          setSelectedRows={setSelectedRows}
        />
      </TableContainer>
    </Container>
  );
};

export default Tables;

const Container = styled.div`
  margin: auto;
  max-width: 1200px;
`;

const TableContainer = styled.div`
  padding: 1rem;
  margin-top: 2rem;
  height: 900px;
  width: 100%;
`;
