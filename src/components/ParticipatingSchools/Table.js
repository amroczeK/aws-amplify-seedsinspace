import { DataGridTable } from "../tables/DataGrid";
import styled from "styled-components";

const defaultColumns = [
  { field: "Type", headerName: "Type", width: 110 },
  { field: "Height", headerName: "Height", type: "number", width: 125 },
  { field: "StemLength", headerName: "Stem Length (mm)", type: "number", width: 215 },
  { field: "LeafLength", headerName: "Leaf Length (mm)", type: "number", width: 210 },
  { field: "LeafWidth", headerName: "Leaf Width (mm)", type: "number", width: 200 },
  { field: "LeafCount", headerName: "Leaf Count", type: "number", width: 155 },
  { field: "LeafColour", headerName: "Leaf Colour", width: 160 },
  { field: "Temperature", headerName: "Temp (C)", type: "number", width: 140 },
  { field: "Humidity", headerName: "Humidify (%)", type: "number", width: 170 },
  { field: "WaterVolume", headerName: "Water Volume (mL)", type: "number", width: 220 },
  { field: "PhLevel", headerName: "PH Level", type: "number", width: 140 },
  { field: "Date", headerName: "Date", width: 120 },
];

const Table = ({ data, error = null, loading }) => {
  return (
    <TableContainer>
      <DataGridTable
        rowData={data || []}
        defaultColumns={defaultColumns}
        loading={loading}
        getRowId={r => r.createdAt}
        error={error?.message ? true : null}
      />
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  margin-top: 0.5rem;
  min-height: 400px;
  height: 450px;
  width: 100%;
`;
