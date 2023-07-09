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
function ProfitCompanyChart({ dataProfitsCompany }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Biểu đồ doanh thu của công ty'
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
                data: dataProfitsCompany.map(data => data.companyRevenue),
                backgroundColor: '#369CE1'
            }
        ]
    }
    // return <Bar options={options} data={data} />
    return <></>
}

export default ProfitCompanyChart
