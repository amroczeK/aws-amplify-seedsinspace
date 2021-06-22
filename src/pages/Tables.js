import React, { useState, useEffect, useContext } from "react";
import { DataGridTable } from "../components/tables/data-grid";
import styled from "styled-components";
import { DataContext } from "../components/context/Data";

const defaultColumns = [
  { field: "entry_id", headerName: "ID", width: 100 },
  { field: "school_id", headerName: "School ID", width: 145 },
  { field: "type", headerName: "Type", width: 110 },
  { field: "height", headerName: "Height", width: 125 },
  { field: "stem_length", headerName: "Stem Length (mm)", type: "number", width: 215 },
  { field: "leaf_length", headerName: "Leaf Length (mm)", type: "number", width: 210 },
  { field: "leaf_width", headerName: "Leaf Width (mm)", type: "number", width: 200 },
  { field: "leaf_colour", headerName: "Leaf Colour", width: 160 },
  { field: "leaf_count", headerName: "Leaf Count", type: "number", width: 155 },
  { field: "temperature", headerName: "Temp (C)", type: "number", width: 140 },
  { field: "humidity", headerName: "Humidify (%)", type: "number", width: 170 },
  { field: "water_volume", headerName: "Water Volume (mL)", type: "number", width: 220 },
  { field: "ph_level", headerName: "PH Level", type: "number", width: 140 },
  { field: "createdAt", headerName: "Entry Date", width: 120 },
  { field: "updatedAt", headerName: "Updated Date", width: 120 },
];

const Tables = () => {
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const { seedData } = useContext(DataContext);

  useEffect(() => {
    setRowData(seedData);
    setLoading(false);
  }, [seedData]);

  return (
    <Container>
      <TableContainer>
        <DataGridTable
          rowData={rowData}
          defaultColumns={defaultColumns}
          loading={loading}
          setSelectedRows={setSelectedRows}
          getRowId={r => r.entry_id}
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
