import '../resources/Grid.css';
import Grid from './Grid.tsx';
import useAdminDashboard from '../hooks/useAdminDashboard.tsx';
import useMobile from '../hooks/useMobile';

function AdminDashboard() {
  
  const {defaultColDef, columnDefs, onSelectionChanged, onAddRowClick, onGridReady, onCellValueChanged, btnDisable, onSaveClick, onDeleteClick} = useAdminDashboard();
  const isMobile = useMobile();

  return (
    <Grid
      height = {isMobile ? "85vh" : "91vh"}
      width = {"100%"}
      defaultColDef={defaultColDef}
      columnDefs={columnDefs}
      rowSelection="multiple"
      onSelectionChanged={onSelectionChanged}
      onAddRowClick = {onAddRowClick}
      onGridReady = {onGridReady}
      onCellValueChanged = {onCellValueChanged}
      onSaveClick={onSaveClick}
      onDeleteClick={onDeleteClick}
      btnDisable={btnDisable}
    />
  )
}

export default AdminDashboard