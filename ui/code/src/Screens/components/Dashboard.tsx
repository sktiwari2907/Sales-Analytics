import SummaryDashboard from './SummaryDashboard';
import Charts from './Charts';
import Loader from './Loader';
import useDashboard from '../hooks/useDashboard';
import FilterPanel from './FilterPanel';
import { useState } from 'react';

function Dashboard() {
  const {filters, setFilters, data, isLoading, filterPanelConfig, filterPanelData, isFilterPanelLoading} = useDashboard();
  const [collapsible, setCollapsible] = useState(true);
  return (
    <div className='dashboard'>
      {isLoading && <Loader />}
      <FilterPanel config={filterPanelConfig} filterPanelData={filterPanelData} isFilterPanelLoading={isFilterPanelLoading} filters={filters} setFilters={setFilters} collapsible= {collapsible} setCollapsible= {setCollapsible}/>
      <div className='dashboardCnt' style={{ marginLeft: !collapsible ? "17%" : "4%" }}>
        <SummaryDashboard summaryData={data?.summary} />
        <Charts data={data}/>
      </div>
    </div>
  )
}

export default Dashboard