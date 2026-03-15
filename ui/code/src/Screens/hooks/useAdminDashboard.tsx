import { useParams } from "react-router-dom";
import React, { useRef, useState, useMemo } from "react";
import { AdminColumnConfig } from '../config/Config';
import { AgGridReact } from "ag-grid-react";
import api from "../api/api.js";
import type { ColDef, EditableCallbackParams, CellClassParams, FilterModel, SortModelItem, SelectionChangedEvent, GridReadyEvent, CellChangedEvent, GridApi, CellValueChangedEvent } from "ag-grid-community";
import type { IGetRowsParams, IDatasource } from "ag-grid-community";

type LibraryType = keyof typeof AdminColumnConfig;

type RowData = {
  id: string;
  _isNew?: boolean;
  [key: string]: any;
};

const fetchServerRows = async (
  library: LibraryType, 
  startRow: number, 
  endRow: number, 
  filterModel: FilterModel, 
  sortModel: SortModelItem[]
) => {
  try {

    const response = await api.post("/api/sales/getData", {
      library,
      start: startRow,
      end: endRow,
      filter: filterModel,
      sort: sortModel
    });

    const result = response.data;

    if (result.status !== "success") {
      throw new Error(result.error);
    }

    const { data, totalRows } = result;

    return { data, totalRows };
  } catch (error) {
    console.error(error);
  }
};

function useAdminDashboard() {
  const { library } = useParams<{ library: LibraryType }>();

  const gridRef = useRef<GridApi | null>(null);
  const [btnDisable, setBtnDisable] = useState(
      {add: true, del: true, save: true, imp: false, exp: false}
  );
  const gridRowsRef = useRef<Record<string, RowData[]>>({"newRows": [], "updatedRows": [], "deletedRows": []});

  const generateColumns = (columns: ColDef[]) =>
    columns.map(col => {
      const originallyEditable = !!col.editable;
      return {
        ...col,
        editable: (params: EditableCallbackParams) =>
          params.data?._isNew ? true : originallyEditable,
        cellClassRules: {
          "editable-cell": (params: CellClassParams) =>
            params.data?._isNew ? true : originallyEditable
        }
      };
    });
  const columnDefs = generateColumns(AdminColumnConfig[library]);

  const dataSource: IDatasource = useMemo(() => ({
    getRows: async (params: IGetRowsParams) => {
      params.api.showLoadingOverlay();
      const { startRow, endRow, filterModel, sortModel } = params;
      const addedRows = gridRowsRef.current["newRows"];
      const addedCount = addedRows.length;

      let rowsToDisplay: any[] = [];
      let serverStart = 0;
      let serverEnd = 0;

      if (startRow < addedCount) {
        const localPart = addedRows.slice(startRow, endRow);

        if (localPart.length < (endRow - startRow)) {
          serverStart = 0;
          serverEnd = endRow - addedCount;
          rowsToDisplay = [...localPart];
        } else {
          rowsToDisplay = localPart;
        }
      } else {
        serverStart = startRow - addedCount;
        serverEnd = endRow - addedCount;
      }
      const deletedIds = gridRowsRef.current.deletedRows;
      const serverResult = await fetchServerRows(library, serverStart, serverEnd, filterModel, sortModel);
      const filteredServerRows = serverResult?.data.filter(
        (row: any) => !deletedIds.includes(row.sales_id)
      );
      rowsToDisplay = [...rowsToDisplay, ...filteredServerRows];
      params.successCallback(rowsToDisplay, serverResult?.totalRows + addedCount);
      params.api.hideOverlay();
    },
  }), [library]);

  const onAddRowClick = () => {
    if (!gridRef.current) return;

    const columnDefs = gridRef.current?.getColumnDefs();

    const newRow: RowData = {
        id: `temp-${Date.now()}`,
        _isNew: true,
    };

    columnDefs?.forEach((col) => {
      if ("field" in col && col.field) {
        newRow[col.field] = "";
      }
    });

    const updated = [newRow, ...gridRowsRef.current["newRows"]];
    
    setBtnDisable(prev => ({
      ...prev,
      save: false
    }));
    gridRowsRef.current["newRows"] = updated;

    gridRef.current?.refreshInfiniteCache();
  };

  const onGridReady = (params: GridReadyEvent) => {
    gridRef.current = params.api;
    params.api.setGridOption('datasource', dataSource);
  };

  const onCellValueChanged = (params: CellValueChangedEvent) => {
    if (params.data?._isNew) return;
    const idx = gridRowsRef.current.updatedRows.findIndex(r => r.sales_id === params.data.sales_id);
    if (idx >= 0) {
      gridRowsRef.current.updatedRows[idx] = params.data;
    } else {
      gridRowsRef.current.updatedRows.push(params.data);
    }
    setBtnDisable(prev => ({
      ...prev,
      save: false
    }));
  };

  const onSelectionChanged = (event: SelectionChangedEvent) => {
    const count = event.api.getSelectedRows().length;
    setBtnDisable(prev => ({
      ...prev,
      del: count === 0
    }));
  };

  const onSaveClick = async() => {
    try {

      const response = await api.post("/api/sales/saveData", {
        library,
        newRows: gridRowsRef.current.newRows,
        updatedRows: gridRowsRef.current.updatedRows,
        deleteRows: gridRowsRef.current.deletedRows
      });

      const result = response.data;

      if (result.status != "success") throw Error(result.error);

      setBtnDisable(prev => ({
        ...prev,
        save: true
      }));

    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteClick = () => {
    try {
      const selectedRows = gridRef.current?.getSelectedRows();
      if (!selectedRows?.length) return;

      selectedRows.forEach(row => {
        if (row._isNew) {
          gridRowsRef.current.newRows = gridRowsRef.current.newRows.filter(r => r.id !== row.id);
        } else {
          gridRowsRef.current.deletedRows.push(row.sales_id);
        }
      });

      gridRef.current?.deselectAll();

      gridRef.current?.purgeInfiniteCache();

      setBtnDisable(prev => ({
        ...prev,
        del: true,
        save: false
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    library: library || "",
    gridRef,
    dataSource: dataSource || {} as IDatasource,
    onAddRowClick: onAddRowClick || (() => {}),
    onGridReady: onGridReady || (() => {}),
    onCellValueChanged: onCellValueChanged || (() => {}),
    defaultColDef: {},
    columnDefs: columnDefs || [],
    btnDisable: btnDisable || {},
    onSelectionChanged: onSelectionChanged || (() => {}),
    onSaveClick: onSaveClick || (() => {}),
    onDeleteClick: onDeleteClick || (() => {})
  };
}

export default useAdminDashboard;
