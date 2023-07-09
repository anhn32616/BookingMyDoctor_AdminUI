import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function MultiBarChart({ dataRevenue }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Biểu đồ doanh thu của bác sĩ'
            }
        }
    }

    const labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: dataRevenue.map(data => data.doctorRevenue),
                backgroundColor: '#FFCD58'
            },
            {
                label: 'Lợi nhuận',
                data: dataRevenue.map(data => data.doctorProfit),
                backgroundColor: '#369CE1'
            }
        ]
    }
    // return <Bar options={options} data={data} />
    return <></>
}
export default MultiBarChart
