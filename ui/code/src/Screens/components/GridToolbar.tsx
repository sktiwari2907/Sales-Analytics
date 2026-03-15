import React, { useState } from 'react'

type GridToolbarProps = {
  gridToolbarVisible: boolean;
  addBtn: boolean;
  deleteBtn: boolean;
  saveBtn: boolean;
  importBtn: boolean;
  exportBtn: boolean;

  onAddRowClick: () => void;
  onSaveClick: () => void;
  onDeleteClick: () => void;

  btnDisable: {
    del: boolean;
    save: boolean;
    imp: boolean;
    exp: boolean;
  };
};

function GridToolbar({gridToolbarVisible ,addBtn, deleteBtn, saveBtn, importBtn, exportBtn, onAddRowClick, btnDisable, onSaveClick, onDeleteClick}: GridToolbarProps) {
    
  return (
    <>
    {gridToolbarVisible && 
        (<div
            style={{
            display: "flex",
            width: "100%",
            backgroundColor: "#fff",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            padding: "10px 12px",
            justifyContent: "flex-end"
            }}
        >
            {addBtn && <button type="button" className='add' aria-label="add" title="Add" disabled= {false} onClick={onAddRowClick}/>}
            {deleteBtn && <button type="button" className='delete' aria-label="delete" title="Delete" disabled= {btnDisable.del} onClick={onDeleteClick}/>}
            {saveBtn && <button type="button" className='save' aria-label="save" title="Save" disabled= {btnDisable.save} onClick={onSaveClick}/>}
            {importBtn && <button type="button" className='import' aria-label="import" title="Import" disabled= {btnDisable.imp}/>}
            {exportBtn && <button type="button" className='export' aria-label="export" title="Export" disabled= {btnDisable.exp}/>}
        </div>
    )}
    </>
    
  )
}

export default GridToolbar