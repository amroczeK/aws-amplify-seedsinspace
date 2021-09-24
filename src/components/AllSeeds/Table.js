import React, { useState, useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";
import { DataGridTable } from "../tables/DataGrid";
import { DataContext } from "../../context/Data";
import SeedImageView from "../tables/SeedImageView";
import SeedNotesView from "../tables/SeedNotesView";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@material-ui/data-grid";

function Toolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const defaultColumns = [
  { field: "Type", headerName: "Type", width: 110 },
  {
    field: "Image",
    headerName: "Image",
    width: 125,
    renderCell: ({ row }) => <SeedImageView row={row} />,
  },
  {
    field: "Notes",
    headerName: "Notes",
    width: 120,
    renderCell: ({ row }) => <SeedNotesView row={row} />,
  },
  { field: "Date", headerName: "Date", width: 120 },
  { field: "Height", headerName: "Height (mm)", type: "number", width: 170 },
  { field: "StemLength", headerName: "Stem Length (mm)", type: "number", width: 215 },
  { field: "LeafLength", headerName: "Leaf Length (mm)", type: "number", width: 210 },
  { field: "LeafWidth", headerName: "Leaf Width (mm)", type: "number", width: 200 },
  { field: "LeafCount", headerName: "Leaf Count", type: "number", width: 155 },
  { field: "LeafColour", headerName: "Leaf Colour", width: 160 },
  { field: "Temperature", headerName: "Temp (C)", type: "number", width: 140 },
  { field: "Humidity", headerName: "Humidify (%)", type: "number", width: 170 },
  { field: "WaterVolume", headerName: "Water Volume (mL)", type: "number", width: 220 },
  { field: "PhLevel", headerName: "PH Level", type: "number", width: 140 },
];

const Table = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  // TODO Do something with selected rows
  if (selectedRows) {
  }

  const { seedData, error, loading } = useContext(DataContext);

  return (
    <TableContainer>
      {error?.message && (
        <Alert style={{ marginBottom: "1rem" }} severity="error">
          {error.message || "An error occurred."}
        </Alert>
      )}
      <DataGridTable
        rowData={seedData || []}
        defaultColumns={defaultColumns}
        loading={loading}
        setSelectedRows={setSelectedRows}
        getRowId={r => r.createdAt}
        error={error?.message ? true : null}
        customToolbar={Toolbar}
      />
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  margin-top: 2rem;
  min-height: 500px;
  height: 550px;
  width: 100%;
`;
