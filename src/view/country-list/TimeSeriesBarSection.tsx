import { IApiCovidData } from '@/src/types/api/covid'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js'
import { useEffect, useState } from 'react'
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
            display: true,
        },
        title: {
            display: true,
        },
    },
}

interface TimeSeriesBarSectionProps {
    data: IApiCovidData[]
}
const TimeSeriesBarSection: React.FC<TimeSeriesBarSectionProps> = ({
    data,
}) => {
    const [filteredData, setFilteredData] = useState(data)
    // const [isBarChart, setIsBarChart] = useState(false)

    useEffect(() => {
        setFilteredData([...data])
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full rounded-md bg-red-alpha px-4 py-4">
                <Bar
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ location }) => location),
                        datasets: [
                            {
                                label: 'Death',
                                data: filteredData.map(
                                    ({ total_deaths }) => total_deaths
                                ),
                                backgroundColor: '#ef4444',
                                borderRadius: 12,
                            },
                        ],
                    }}
                />
            </div>
            <div className="w-full rounded-md bg-blue-alpha px-4 py-4">
                <Bar
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ location }) => location),
                        datasets: [
                            {
                                label: 'Cases',
                                data: filteredData.map(
                                    ({ total_cases }) => total_cases
                                ),
                                backgroundColor: '#2563eb',
                                borderRadius: 12,
                            },
                        ],
                    }}
                />
            </div>
            <div className="w-full rounded-md bg-green-alpha px-4 py-4">
                <Bar
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ location }) => location),
                        datasets: [
                            {
                                label: 'Vaccinated',
                                data: filteredData.map(
                                    ({ total_vaccinations }) =>
                                        total_vaccinations
                                ),
                                backgroundColor: '#16a34a',
                                borderRadius: 12,
                            },
                        ],
                    }}
                />
            </div>
            <div className="w-full rounded-md bg-amber-alpha px-4 py-4">
                <Bar
                    options={{ ...options }}
                    data={{
                        labels: filteredData.map(({ location }) => location),
                        datasets: [
                            {
                                label: 'Boosters',
                                data: filteredData.map(
                                    ({ total_boosters }) => total_boosters
                                ),
                                backgroundColor: '#d97706',
                                borderRadius: 12,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default TimeSeriesBarSection
