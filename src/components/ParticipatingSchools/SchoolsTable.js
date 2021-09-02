import React, { useState, useEffect } from "react";
import { DataGridTable } from "../tables/DataGrid";
import styled from "styled-components";
import Button from "../../components/inputs/Button"

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
          <Button
            title={"View"}
            size="small"
            onClickHandler={() => handleViewProfileClick(row)}
          />
        </div>
      ),
    },
    { field: "SchoolName", headerName: "Name", flex: 1 },
    { field: "Address", headerName: "Address", flex: 1.5 },
    {
      field: "InactiveSeeds",
      headerName: "Inactive Seeds",
      flex: 0.5,
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