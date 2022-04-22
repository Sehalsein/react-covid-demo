import { useCountryList } from '@/src/api/covid'
import BasicLayout from '@/src/components/Layout'
import Search from '@/src/components/Search'
import Table, { TableColumnsProps } from '@/src/components/Table'
import { useAuth } from '@/src/hooks/useAuth'
import { IApiCovidData } from '@/src/types/api/covid'
import TimeSeriesBarSection from '@/src/view/country-list/TimeSeriesBarSection'
import WorldMapGraph from '@/src/view/country-list/WorldMapGraph'
import { useRouter } from 'next/router'
import { useState } from 'react'

const columns: TableColumnsProps<IApiCovidData>[] = [
    {
        title: 'Country',
        key: 'location',
    },
    {
        title: 'Total Cases',
        key: 'total_cases',
    },
    {
        title: 'Death',
        key: 'total_deaths',
    },
    {
        title: 'Tests',
        key: 'total_tests',
    },
    {
        title: 'Vaccinated',
        key: 'total_vaccinations',
    },
]

const CountryHome = () => {
    const { data, loading } = useCountryList()
    const router = useRouter()
    const [isTableExpanded, setTableExpanded] = useState(false)

    const { user } = useAuth()

    return (
        <>
            <div
                className={`grid ${
                    isTableExpanded ? 'grid-cols-1' : 'grid-cols-2'
                } gap-12`}
            >
                <div className="flex flex-col gap-6">
                    {data && (
                        <Search
                            data={data.map(({ location, iso_code }) => ({
                                value: location,
                                id: iso_code,
                            }))}
                            onSelect={({ id }) => {
                                router.push({
                                    pathname: '/country/compare',
                                    query: {
                                        code: id,
                                    },
                                })
                            }}
                        />
                    )}
                    <div
                        className={`flex items-center ${
                            user && user.history
                                ? 'justify-between'
                                : 'justify-end'
                        } gap-4`}
                    >
                        {user && user.history && (
                            <span
                                className="cursor-pointer text-sm font-medium text-blue-600 underline"
                                onClick={() => {
                                    router.push({
                                        pathname: '/country/compare',
                                        query: {
                                            code: user.history.countries.toString(),
                                            timeSeriesKey:
                                                user.history.timeSeriesKey,
                                            statsKey: user.history.statsKey,
                                        },
                                    })
                                }}
                            >
                                View Previous Search
                            </span>
                        )}
                        <button
                            className="rounded-md bg-slate-200 px-4 py-4 text-slate-600 dark:bg-background-dark-alternate"
                            onClick={() => {
                                setTableExpanded(!isTableExpanded)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                />
                            </svg>
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={data}
                        loading={loading}
                        onRowClick={(row) => {
                            router.push(`/country/${row.iso_code}`)
                        }}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    {data && <WorldMapGraph data={data} />}
                    {data && <TimeSeriesBarSection data={data} />}
                </div>
            </div>
        </>
    )
}

CountryHome.getLayout = function getLayout(page: React.ReactElement) {
    return <BasicLayout>{page}</BasicLayout>
}
export default CountryHome
