import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function RevenueByMarket({revenueByMarket}) {
  const pieData = revenueByMarket?.map(item => ({
    name: item.market_name,
    y: Number(item.total_revenue)
  })) || [];

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Revenue by Market'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.0f}'
        }
      }
    },
    series: [{
      name: 'Markets',
      colorByPoint: true,
      data: pieData
    }]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps= {{
          style: {
            borderRadius: '8px'
          }
        }}
      />
    </div>
  )
}

export default RevenueByMarket