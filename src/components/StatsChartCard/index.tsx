import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
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

interface StatsChartCard {
    primaryColor: string
    className?: string
    title: string
    statValue: number
    isActive?: boolean
    onClick: () => void
    dataset?: number[]
}

const StatsChartCard: React.FC<StatsChartCard> = ({
    className,
    statValue,
    title,
    primaryColor,
    onClick,
    dataset,
}) => {
    return (
        <div
            style={{
                transition: 'background .15s ease-in-out',
            }}
            className={`flex flex-col rounded-md  py-4 text-center ${className} cursor-pointer`}
            onClick={() => {
                onClick()
            }}
        >
            <span
                className="mb-2 text-sm font-bold "
                style={{
                    color: primaryColor,
                }}
            >
                {title}
            </span>
            {/* <span className="text-xs">+292</span> */}
            <span
                className="text-2xl font-bold"
                style={{
                    color: primaryColor,
                }}
            >
                {statValue.toLocaleString()}
            </span>
            {dataset && (
                <div className="px-4">
                    <Line
                        options={options}
                        data={{
                            labels: dataset.map(() => ''),
                            datasets: [
                                {
                                    label: 'Dataset 1',
                                    data: dataset,
                                    borderColor: primaryColor,
                                    pointRadius: 0,
                                    tension: 0.3,
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default StatsChartCard
