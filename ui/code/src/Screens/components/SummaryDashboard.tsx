import { Valueformatter } from "../utils/Utils"

type summaryProps = {
    revenue: number
}

function SummaryDashboard({summaryData}:summaryProps) {
    const summary = [
        {
            title: 'REVENUE',
            format: 'currency',
            field: 'total_revenue',
            yoy: 'yoy_revenue',
            icon: '../resources/revenue.svg',
            class: 'revenueIcon'
        },
        {
            title: 'VOLUME',
            format: 'number',
            field: 'total_volume',
            yoy: 'yoy_volume',
            icon: '../assets/revenue.svg',
            class: 'revenueIcon'
        },
        {
            title: 'MARGIN %',
            format: 'percent',
            field: 'avg_margin',
            yoy: 'yoy_margin',
            icon: '../assets/revenue.svg',
            class: 'revenueIcon'
        },
        {
            title: 'DISCOUNT',
            format: 'currency',
            currency: 'USD',
            field: 'total_discount',
            yoy: 'yoy_discount_amount',
            icon: '../assets/revenue.svg',
            class: 'revenueIcon'
        }
    ];
  return (
    <div className='summaryCnt'>
        {summary?.map((data) => {
            return (
                <div className='summaryTile'>
                    <button className={data.class}></button>
                    <div className="summaryData">
                        <label htmlFor={data.title} style={{color: '#9ca3af', fontSize: '14px'}}>{data.title}</label>
                        <span style={{fontWeight: 'bold', fontSize: '24px'}}>{Valueformatter(summaryData?.[data.field], data.format)}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', border: '2px solid #ededef', padding: '6px', width: '100px', margin: 'auto'}}>
                        <label htmlFor={data.title + "YOY"} style={{color: '#9ca3af', fontSize: '14px'}}>YOY</label>
                        <span style={{fontWeight: 'bold', color: Number(summaryData?.[data.yoy]) >=0 ? 'green' : 'red'}}>{Number(summaryData?.[data.yoy]) >= 0 ? '▲' : '▼'}{' '}{Valueformatter(Math.abs(summaryData?.[data.yoy]), 'percent')}</span>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default SummaryDashboard;