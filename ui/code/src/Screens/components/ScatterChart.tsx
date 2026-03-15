import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ScatterChart = ({marginVolByProduct}) => {
  marginVolByProduct = marginVolByProduct || [];
  const scatterData = marginVolByProduct?.map(item => ({
    x: Number(item.total_volume),        
    y: Number(item.avg_margin),          
    name: item.product_id
  }));

  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Margin vs Volume by Product'
    },
    xAxis: {
      title: { text: 'Volume' }
    },
    yAxis: {
      title: { text: 'Margin (%)' }
    },
    tooltip: {
      headerFormat: '<b>{point.name}</b><br>',
      pointFormat: 'Volume: {point.x}<br>Margin: {point.y:.2f}%'
    },
    series: [{
      name: 'Products',
      data: scatterData
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
  );
};

export default ScatterChart;