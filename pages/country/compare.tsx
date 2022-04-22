import { latestSearch } from '@/src/api/auth'
import { fetchCompareList, useCountryList } from '@/src/api/covid'
import BasicLayout from '@/src/components/Layout'
import Search from '@/src/components/Search'
import Table, { TableColumnsProps } from '@/src/components/Table'
import { IApiCovidData } from '@/src/types/api/covid'
import { getRandomColor } from '@/src/utils/misc'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import format from 'date-fns/format'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
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

const CountryCompare = () => {
    const [compareData, setCompareData] = useState<IApiCovidData[]>([])
    const [loading, setLoading] = useState(true)
    const [countriesList, setCountriesList] = useState<string[]>([])
    const router = useRouter()
    const { data: locationList } = useCountryList()
    const [dataSetKey, setDataSetKey] = useState('')
    const [compareKey, setCompareKey] = useState('')

    const fetchCompareData = (key: string[]) => {
        setLoading(true)
        fetchCompareList(key)
            .then((res) => {
                setCompareData(res)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        const { code, timeSeriesKey, statsKey } = router.query
        if (code) {
            setCountriesList((code as string).split(','))
        }

        if (timeSeriesKey) {
            setDataSetKey(timeSeriesKey.toString())
        }

        if (statsKey) {
            setCompareKey(statsKey.toString())
        }
    }, [router])

    useEffect(() => {
        if (countriesList.length || !loading) {
            fetchCompareData(countriesList)
        } else {
            setLoading(false)
        }
    }, [countriesList])

    useEffect(() => {
        latestSearch({
            countries: countriesList,
            timeSeriesKey: dataSetKey,
            statsKey: compareKey,
        })
            .then(() => {
                console.log('Search Updated')
            })
            .catch(() => {
                console.log('Search Update Error')
            })
    }, [countriesList, compareKey, dataSetKey])

    const columns: TableColumnsProps<IApiCovidData>[] = [
        {
            title: 'Country',
            key: 'location',
        },
        {
            title: 'Actions',
            key: '',
            renderView: (row) => {
                return (
                    <div className="flex justify-center gap-8">
                        <span
                            className="text-blue-600"
                            onClick={() => {
                                setCountriesList([
                                    ...countriesList.filter(
                                        (e) => e !== row.iso_code
                                    ),
                                ])
                            }}
                        >
                            DELETE
                        </span>
                        <span
                            className="text-blue-600"
                            onClick={() => {
                                router.push(`/country/${row.iso_code}`)
                            }}
                        >
                            DETAIL
                        </span>
                    </div>
                )
            },
        },
    ]

    let labels: string[] = []

    if (compareData && compareData[0]) {
        labels = (compareData[0].data || []).map(({ date }) => {
            const newDate = new Date(date || '')
            return format(newDate, 'dd MMM yyyy')
        })
    }

    return (
        <>
            <div className={`grid grid-cols-2 gap-12`}>
                <div className="flex flex-col gap-6">
                    {locationList && (
                        <Search
                            data={locationList.map(
                                ({ location, iso_code }) => ({
                                    value: location,
                                    id: iso_code,
                                })
                            )}
                            onSelect={({ id }) => {
                                setCountriesList([...countriesList, id])
                            }}
                        />
                    )}

                    <Table
                        columns={columns}
                        data={compareData}
                        loading={loading}
                    />
                    {!loading && compareData.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-600 dark:text-slate-400">
                                    Select Time Series Attribute
                                </label>
                                <select
                                    className="bg-slate-200 px-2 py-2 py-2 text-slate-600 dark:bg-background-dark-alternate dark:text-slate-400"
                                    name="Select Attribute"
                                    onChange={(e) => {
                                        setDataSetKey(e.target.value)
                                    }}
                                    value={dataSetKey}
                                >
                                    {/* {Object.keys(data[0]).map((e) => {
                                        return (
                                            <option key={e} value={e}>
                                                {e.replaceAll('_', ' ')}
                                            </option>
                                        )
                                    })} */}

                                    <option value={''}>Select Attribute</option>

                                    {compareData[0] &&
                                        compareData[0].data &&
                                        Object.keys(compareData[0].data[0])
                                            .filter(
                                                (e) =>
                                                    !['date'].includes(
                                                        e.toLowerCase()
                                                    )
                                            )
                                            .map((e) => {
                                                return (
                                                    <option key={e} value={e}>
                                                        {e.replaceAll('_', ' ')}
                                                    </option>
                                                )
                                            })}
                                </select>
                            </div>
                            {dataSetKey && (
                                <div className="w-full rounded-md bg-blue-alpha px-4 py-4">
                                    <Line
                                        options={options}
                                        data={{
                                            labels,
                                            datasets: [
                                                ...compareData.map(
                                                    ({
                                                        location,
                                                        data,
                                                        ...rest
                                                    }) => ({
                                                        label: location,
                                                        data: data?.map((d) =>
                                                            dataSetKey in d
                                                                ? (d as any)[
                                                                      dataSetKey
                                                                  ]
                                                                : dataSetKey in
                                                                  rest
                                                                ? (rest as any)[
                                                                      dataSetKey
                                                                  ]
                                                                : 0
                                                        ),
                                                        borderColor:
                                                            getRandomColor(),
                                                    })
                                                ),
                                            ],
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-6">
                    {!loading && compareData.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-600 dark:text-slate-400">
                                    Select Attribute
                                </label>
                                <select
                                    className="bg-slate-200 px-2 py-2 py-2 text-slate-600 dark:bg-background-dark-alternate dark:text-slate-400"
                                    name="Select Attribute"
                                    onChange={(e) => {
                                        setCompareKey(e.target.value)
                                    }}
                                    value={compareKey}
                                >
                                    <option value={''}>Select Attribute</option>
                                    {Object.keys(compareData[0])
                                        .filter(
                                            (e) =>
                                                ![
                                                    'data',
                                                    'continent',
                                                    'location',
                                                    'iso_code',
                                                ].includes(e.toLowerCase())
                                        )
                                        .map((e) => {
                                            return (
                                                <option key={e} value={e}>
                                                    {e.replaceAll('_', ' ')}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>

                            {compareKey && (
                                <div className="w-full rounded-md bg-blue-alpha px-4 py-4">
                                    <Bar
                                        options={{
                                            scales: {
                                                x: {
                                                    type: 'category',
                                                    labels: [
                                                        compareKey.replaceAll(
                                                            '_',
                                                            ' '
                                                        ),
                                                    ],
                                                },
                                            },
                                        }}
                                        data={{
                                            labels: countriesList,
                                            datasets: [
                                                ...countriesList.map((val) => {
                                                    const d = compareData.find(
                                                        (e) =>
                                                            e.iso_code === val
                                                    )
                                                    return {
                                                        label: val,
                                                        data: [
                                                            d && compareKey in d
                                                                ? (d as any)[
                                                                      compareKey
                                                                  ]
                                                                : 0,
                                                        ],
                                                        backgroundColor:
                                                            getRandomColor(),
                                                    }
                                                }),
                                            ],
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

CountryCompare.getLayout = function getLayout(page: React.ReactElement) {
    return <BasicLayout>{page}</BasicLayout>
}
export default CountryCompare
