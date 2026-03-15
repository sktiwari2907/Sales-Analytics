import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ProductPerformance({salesByCategory}) {

  salesByCategory = salesByCategory || []

  const categories = [...new Set(salesByCategory?.map(item => item.category_name))];
  const years = [...new Set(salesByCategory?.map(item => item.order_year))];

  const series = years?.map(year => ({
    name: String(year),
    data: categories?.map(category => {
      const match = salesByCategory?.find(
        item =>
          item.order_year === year &&
          item.category_name === category
      );

      return match ? Number(match.total_revenue) : 0;
    })
  }));

  const options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Sales Data by Category and Year'
    },
    xAxis: {
      categories,
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Sales (in USD)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valuePrefix: '$'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}'
        }
      }
    },
    series
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
}

export default ProductPerformance