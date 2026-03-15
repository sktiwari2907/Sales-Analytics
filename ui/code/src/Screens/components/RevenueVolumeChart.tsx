import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type RevenueVolume = {
  order_month: number | string;
  total_revenue: number | string;
  total_volume: number | string;
};

type RevenueVolumeChartProps = {
  revenueVolumeData: RevenueVolume[];
};

const RevenueVolumeChart = ({revenueVolumeData}: RevenueVolumeChartProps) => {

  const options = useMemo(() => {
    if (!revenueVolumeData?.length) return {};

    return {
      chart: {
        zoomType: "xy"
      },

      title: {
        text: "Revenue & Volume Trend"
      },

      xAxis: {
        categories: revenueVolumeData.map(item => String(item.order_month)),
        crosshair: true,
        gridLineWidth: 0
      },

      yAxis: [
        {
          // Primary Y-axis (Revenue)
          title: {
            text: "Revenue (USD)"
          },
          labels: {
            formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
              const value = this.value as number;
              if (value >= 1000000)
                return (value / 1000000).toFixed(0) + "M"; 
              if (value >= 1000)
                return (value / 1000).toFixed(0) + "K";
              return value.toFixed(0);
            }
          },
          gridLineWidth: 0
        },
        {
          // Secondary Y-axis (Volume)
          title: {
            text: "Volume"
          },
          labels: {
            format: "{value:.0f}"
          },
          opposite: true,
          gridLineWidth: 0
        }
      ],

      tooltip: {
        shared: true,
        formatter: function (this: any) {
          return `
            <b>${this.x}</b><br/>
            Revenue: <b>${Highcharts.numberFormat(this.points[0].y, 0)}</b><br/>
            Volume: <b>${Highcharts.numberFormat(this.points[1].y, 0)}</b>
          `;
        }
      },

      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            format: "{point.y:,.0f}"
          }
        },
        line: {
          dataLabels: {
            enabled: true,
            format: "{point.y:.0f}"
          },
          marker: {
            radius: 4
          }
        }
      },

      series: [
        {
          name: "Revenue",
          type: "column",
          data: revenueVolumeData.map(item =>
            Number(item.total_revenue)
          )
        },
        {
          name: "Volume",
          type: "line",
          yAxis: 1,
          data: revenueVolumeData.map(item =>
            Number(item.total_volume)
          )
        }
      ],

      credits: {
        enabled: false
      }
    };
  }, [revenueVolumeData]);

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

export default RevenueVolumeChart;