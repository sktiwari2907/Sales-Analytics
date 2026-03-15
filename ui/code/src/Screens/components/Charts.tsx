import React from 'react';
import ProductPerformance from './ProductPerformance';
import RevenueByMarket from './RevenueByMarket';
import RevenueVolumeChart from './RevenueVolumeChart';
import ScatterChart from './ScatterChart';

function Charts({data}) {
  return (
    <div className='chartCnt'>
        <ProductPerformance salesByCategory={data?.salesByCategory}/>
        <RevenueByMarket revenueByMarket={data?.revenueByMarket}/>
        <RevenueVolumeChart revenueVolumeData={data?.revenueVolumeData}/>
        <ScatterChart marginVolByProduct={data?.marginVolByProduct}/>
    </div>
  )
}

export default Charts