import { useCountryDetail } from '@/src/api/covid'
import BasicLayout from '@/src/components/Layout'
import InfoCardSection from '@/src/view/country-detail/InfoCardSection'
import LatestStatsSection from '@/src/view/country-detail/LatestStatsSection'
import TabSection from '@/src/view/country-detail/TabSection'
import TimeSeriesBarSection from '@/src/view/country-detail/TimeSeriesBarSection'
import WeekBarStats from '@/src/view/country-detail/WeekBarStats'

import format from 'date-fns/format'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CountryDetailPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, loading } = useCountryDetail(id as string)
    const [activeTab, setActiveTab] = useState('cases')
    const [chartData, setChartData] = useState<any>(null)

    const updateChartData = (currentTab: string) => {
        let backgroundColor = ''
        let chartData: number[] = []
        let labels: string[] = []

        if (currentTab === 'vaccinated') {
            backgroundColor = '#16a34a'

            chartData = (data?.data || [])
                .slice(-7)
                .map(({ new_people_vaccinated_smoothed }) =>
                    new_people_vaccinated_smoothed
                        ? new_people_vaccinated_smoothed
                        : 0
                )
            labels = (data?.data || []).slice(-7).map(({ date }) => {
                const newDate = new Date(date || '')
                return format(newDate, 'dd MMM yyyy')
            })
        } else if (currentTab === 'cases') {
            backgroundColor = '#ef4444'

            chartData = (data?.data || [])
                .slice(-7)
                .map(({ new_cases }) => (new_cases ? new_cases : 0))
            labels = (data?.data || []).slice(-7).map(({ date }) => {
                const newDate = new Date(date || '')
                return format(newDate, 'dd MMM yyyy')
            })
        } else if (currentTab === 'tests') {
            backgroundColor = '#2563eb'

            chartData = (data?.data || [])
                .slice(-7)
                .map(({ new_tests_smoothed }) =>
                    new_tests_smoothed ? new_tests_smoothed : 0
                )
            labels = (data?.data || []).slice(-7).map(({ date }) => {
                const newDate = new Date(date || '')
                return format(newDate, 'dd MMM yyyy')
            })
        } else if (currentTab === 'deceased') {
            backgroundColor = '#475569'
            chartData = (data?.data || [])
                .slice(-7)
                .map(({ new_deaths }) => (new_deaths ? new_deaths : 0))
            labels = (data?.data || []).slice(-7).map(({ date }) => {
                const newDate = new Date(date || '')
                return format(newDate, 'dd MMM yyyy')
            })
        }

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: chartData,
                    backgroundColor: backgroundColor,
                    borderRadius: 12,
                },
            ],
        })
    }

    useEffect(() => {
        updateChartData(activeTab)
    }, [data])

    useEffect(() => {
        updateChartData(activeTab)
    }, [activeTab])

    console.log(data)

    if (!data || loading) {
        return <span>Loading</span>
    }

    return (
        <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0 ">
                        <h1 className="text-3xl font-bold text-blue-600">
                            {data.location}
                        </h1>
                        {/* <span className="text-xs">Last Updated on ASD</span> */}
                    </div>
                    <button
                        className="flex gap-2 rounded-md bg-blue-600 px-2 py-2 text-right text-white"
                        onClick={() => {
                            router.push({
                                pathname: '/compare',
                                query: {
                                    code: data.iso_code,
                                },
                            })
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                            />
                        </svg>
                        Compare
                    </button>
                </div>

                <LatestStatsSection
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    data={data.data}
                />

                <InfoCardSection data={data} />

                <TabSection data={data} />
            </div>
            <div className="flex flex-col gap-6">
                {chartData && (
                    <WeekBarStats chartData={chartData} activeTab={activeTab} />
                )}

                <TimeSeriesBarSection data={data.data || []} />
            </div>
        </div>
    )
}

CountryDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return <BasicLayout>{page}</BasicLayout>
}
export default CountryDetailPage
