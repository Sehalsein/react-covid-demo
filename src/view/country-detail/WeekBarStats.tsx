import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        y: {
            display: false,
        },
        x: {
            ticks: {
                display: true,
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
        },
    },
}

interface WeekBarStatsProps {
    activeTab: string
    chartData: any
}

const WeekBarStats: React.FC<WeekBarStatsProps> = ({
    activeTab,
    chartData,
}) => {
    return (
        <div className="w-full flex-col">
            <h4
                style={{ transition: 'background .15s ease-in-out' }}
                className={`text-xl font-bold ${
                    activeTab === 'cases' ? 'text-red-500' : ''
                }
                        ${activeTab === 'tests' ? 'text-blue-600' : ''}
                        ${activeTab === 'vaccinated' ? 'text-green-600' : ''}
                        ${activeTab === 'deceased' ? 'text-slate-400' : ''}`}
            >
                Last 7 Days
            </h4>
            <div className="w-full">
                <Bar options={{ ...options }} data={chartData} />
            </div>
        </div>
    )
}

export default WeekBarStats
