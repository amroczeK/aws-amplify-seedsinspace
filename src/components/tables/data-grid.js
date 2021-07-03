import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiDataGrid-cellEditable": {
      backgroundColor: "#eee",
    },
  },
}));

export const scrollCell = params => {
  return (
    <div
      className="hide_scroll"
      style={{
        overflowY: params.value.length >= 2 ? "scroll" : "none",
      }}
    >
      {params.value.map((e, idx) => (
        <div className="row_data" key={idx}>
          {e}
        </div>
      ))}
    </div>
  );
};

/**
 * https://material-ui.com/components/data-grid/
 * @param {array} rowData Array of objects [{ id: 1, test: 'Snow', test2: 'Jon'}, { id: 1, test: 'Dog', test2: 'Cat'}],
 * @param {array} defaultColumns Array of objects [{field: "test", headerName: "Test", flex: 1}, {field: "test2" headerName: "Test 2", flex: 0.5}]
 * @returns
 */
export const DataGridTable = ({
  rowData,
  defaultColumns,
  loading,
  setSelectedRows,
  getRowId,
  error,
}) => {
  const classes = useStyles();

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const onRowSelectHandler = e => {
    if (e.isSelected) {
      setSelectedRows(prevState => [...prevState, e.data]);
    } else {
      setSelectedRows(prevState => prevState.filter(item => item.id !== e.data.id));
    }
  };

  const onColumnHeaderOverHandler = e => {
    let resizableClass = "MuiDataGrid-columnSeparator";

    var elements = document.getElementsByClassName(resizableClass);
    for (let element of elements) {
      let className = element.classList;
      className.add("MuiDataGrid-columnSeparatorResizable");
    }
  };

  useEffect(() => {
    if (defaultColumns && defaultColumns.length) setColumns(defaultColumns);
    if (rowData && defaultColumns.length) setRows(rowData);
    // eslint-disable-next-line
  }, [rowData, defaultColumns]);

  return (
    <DataGrid
      className={classes.root}
      rows={rows}
      columns={columns}
      checkboxSelection
      loading={loading}
      showCellRightBorder
      onRowSelected={onRowSelectHandler}
      onColumnHeaderOver={onColumnHeaderOverHandler}
      getRowId={getRowId}
      components={{
        Toolbar: GridToolbar,
      }}
      error={error}
    />
  );
};
