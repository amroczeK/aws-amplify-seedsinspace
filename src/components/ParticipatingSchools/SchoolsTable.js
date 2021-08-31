import React, { useState, useEffect } from "react";
import { DataGridTable } from "../tables/DataGrid";
import styled from "styled-components";

const Table = ({
  data,
  error = null,
  loading,
  handleRowClick,
  handleViewProfileClick,
}) => {
  const [selectedRow, setSelectedRow] = useState([]);

  const defaultColumns = [
    {
      field: "Profile",
      headerName: "",
      description: "Click View Profile to navigate to schools profile.",
      flex: 0.4,
      renderCell: ({ row }) => (
        <p onClick={() => handleViewProfileClick(row)}>View Profile</p>
      ),
    },
    { field: "SchoolName", headerName: "Name", flex: 1 },
    { field: "Address", headerName: "Address", flex: 1.5 },
    {
      field: "InactiveSeeds",
      headerName: "Inactive Seeds",
      flex: 1,
      description: "Seeds which are no longer being recorded.",
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
        getRowId={r => r.createdAt}
        error={error?.message ? true : null}
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
