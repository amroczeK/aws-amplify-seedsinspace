import React, { useState, useEffect } from "react";
import { DataGridTable } from "../tables/DataGrid";
import styled from "styled-components";
import Button from "../../components/inputs/Button";
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from "@material-ui/data-grid";

function Toolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const Table = ({ data, error = null, loading, handleRowClick, handleViewProfileClick }) => {
  const [selectedRow, setSelectedRow] = useState([]);

  const defaultColumns = [
    { field: "SchoolName", headerName: "Name", flex: 1 },
    { field: "Address", headerName: "Address", flex: 1.5 },
    {
      field: "Profile",
      headerName: "",
      description: "Click View Profile to navigate to schools profile.",
      flex: 0.5,
      renderCell: ({ row }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          }}
        >
          <Button title={"View"} size="small" onClickHandler={() => handleViewProfileClick(row)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (selectedRow) {
      handleRowClick(selectedRow);
    }
    // eslint-disable-next-line
  }, [selectedRow]); // Only update when selectedRow changes

  return (
    <TableContainer>
      <DataGridTable
        rowData={data || []}
        defaultColumns={defaultColumns}
        loading={loading}
        checkboxDisabled={true}
        setSelectedRow={setSelectedRow}
        getRowId={r => r.Sk.replace("SCHOOL#", "")}
        error={error?.message ? true : null}
        customToolbar={Toolbar}
      />
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  min-height: 400px;
  height: 450px;
  width: 100%;
`;
