import React, { ReactEventHandler, forwardRef } from 'react';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import '../resources/Grid.css';
import GridToolbar from './GridToolbar';
import type {
  GridReadyEvent,
  SelectionChangedEvent
} from "ag-grid-community";

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);

type GridProps = {
  height: string;
  width: string;
  defaultColDef: any;
  rowData?: any[];
  columnDefs: any[];

  onSelectionChanged: (event: SelectionChangedEvent) => void;
  onAddRowClick: () => void;
  onGridReady: (event: GridReadyEvent) => void;
  onCellValueChanged: (event: CellValueChangedEvent) => void;

  btnDisable: {
    del: boolean;
    save: boolean;
    imp: boolean;
    exp: boolean;
  };

  onSaveClick: () => void;
  onDeleteClick: () => void;
};

const Grid  = ({height, width, defaultColDef, rowData, columnDefs, onSelectionChanged, onAddRowClick, onGridReady, onCellValueChanged, btnDisable, onSaveClick, onDeleteClick }: GridProps) => {
    
    return (
        <div
            style={{
                height: height,
                width: width,
                display: "flex",
                flexDirection: "column",
                padding: 20,
                boxSizing: "border-box",
            }}
            >
            {/* Toolbar */}
            <GridToolbar
                gridToolbarVisible = {true}
                addBtn = {true}
                deleteBtn = {true}
                saveBtn = {true}
                importBtn = {false}
                exportBtn = {true}
                onAddRowClick = {onAddRowClick}
                onSaveClick = {onSaveClick}
                onDeleteClick = {onDeleteClick}
                btnDisable={btnDisable}
            />

            {/* Grid */}
            <div
            className="ag-theme-quartz" style={{ flex: 1 }}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowSelection="multiple"
                    rowModelType="infinite"
                    cacheBlockSize={100}
                    maxBlocksInCache={10}
                    animateRows={true}
                    editType="fullRow" // Optional: makes editing the whole row smoother
                    undoRedoCellEditing={true}
                    onCellValueChanged={onCellValueChanged}
                    onSelectionChanged={onSelectionChanged}
                    onGridReady = {onGridReady}
                />
            </div>
        </div>

    )
};

export default Grid