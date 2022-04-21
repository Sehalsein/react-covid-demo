import { DataSet } from '@/src/types/api/covid'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        y: {
            ticks: {
                display: true,
            },
            grid: {
                display: true,
                drawBorder: false,
            },
        },
        x: {
            ticks: {
                display: true,
                maxTicksLimit: 10,
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },
    },
    plugins: {
        legend: {
            display: true,
        },
        title: {
            display: true,
        },
    },
}

interface TimeSeriesBarSectionProps {
    data: DataSet[]
}
const TimeSeriesBarSection: React.FC<TimeSeriesBarSectionProps> = ({
    data,
}) => {
    const [filteredData, setFilteredData] = useState(data)
    // const [isBarChart, setIsBarChart] = useState(false)
    // console.log(data)

    useEffect(() => {
        setFilteredData([...data].splice(-30))
    }, [])
    return (
        <div className="flex flex-col gap-4">
            <div>
                <span>ASD</span>
            </div>
            <div className="w-full rounded-md bg-blue-alpha px-4 py-4">
                <Line
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ date }) => {
                            const newDate = new Date(date || '')
                            return format(newDate, 'dd MMM yyyy')
                        }),
                        datasets: [
                            {
                                label: 'Cases',
                                data: filteredData.map(
                                    ({ new_cases }) => new_cases
                                ),
                                backgroundColor: '#1e40af',
                                borderColor: '#2563eb',
                                fill: true,
                                // pointRadius: 0,
                                tension: 0.3,
                            },
                        ],
                    }}
                />
            </div>
            <div className="w-full rounded-md bg-red-alpha px-4 py-4">
                <Line
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ date }) => {
                            const newDate = new Date(date || '')
                            return format(newDate, 'dd MMM yyyy')
                        }),
                        datasets: [
                            {
                                label: 'Death',
                                data: filteredData.map(
                                    ({ new_deaths }) => new_deaths
                                ),
                                backgroundColor: '#991b1b',
                                borderColor: '#ef4444',
                                fill: true,
                                // pointRadius: 0,
                                tension: 0.3,
                            },
                        ],
                    }}
                />
            </div>

            <div className="w-full rounded-md bg-green-alpha px-4 py-4">
                <Line
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ date }) => {
                            const newDate = new Date(date || '')
                            return format(newDate, 'dd MMM yyyy')
                        }),
                        datasets: [
                            {
                                label: 'Vaccinated',
                                data: filteredData.map(
                                    ({ new_people_vaccinated_smoothed }) =>
                                        new_people_vaccinated_smoothed
                                ),
                                backgroundColor: '#166534',
                                borderColor: '#16a34a',
                                fill: true,
                                // pointRadius: 0,
                                tension: 0.3,
                            },
                        ],
                    }}
                />
            </div>
            <div className="w-full rounded-md bg-amber-alpha px-4 py-4">
                <Line
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ date }) => {
                            const newDate = new Date(date || '')
                            return format(newDate, 'dd MMM yyyy')
                        }),
                        datasets: [
                            {
                                label: 'New',
                                data: filteredData.map(
                                    ({ positive_rate }) => positive_rate
                                ),
                                backgroundColor: '#92400e',
                                borderColor: '#d97706',
                                fill: true,
                                // pointRadius: 0,
                                tension: 0.3,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default TimeSeriesBarSection
