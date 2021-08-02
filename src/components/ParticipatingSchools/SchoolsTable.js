import React, { useState, useEffect } from "react";
import { DataGridTable } from "../tables/data-grid";
import styled from "styled-components";

const defaultColumns = [
  { field: "SchoolName", headerName: "School Name", flex: 1 },
  { field: "Address", headerName: "Address", flex: 1.5 },
  { field: "InactiveSeeds", headerName: "Inactive Seeds", flex: 1 },
];

const Table = ({ data, error = null, loading, handleRowClick }) => {
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      handleRowClick(selectedRow);
    }
    // eslint-disable-next-line
  }, [selectedRow]);  // Only update when selectedRow changes

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
