import { fetchCompareList, useCountryList } from '@/src/api/covid'
import BasicLayout from '@/src/components/Layout'
import Search from '@/src/components/Search'
import Table, { TableColumnsProps } from '@/src/components/Table'
import { IApiCovidData } from '@/src/types/api/covid'
import { getRandomColor } from '@/src/utils/misc'
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
import format from 'date-fns/format'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

const CountryHome = () => {
    const [compareData, setCompareData] = useState<IApiCovidData[]>([])
    const [loading, setLoading] = useState(true)
    const [countriesList, setCountriesList] = useState<string[]>([])
    const router = useRouter()

    const { data: locationList } = useCountryList()
    const [currentKey, setCurrentKey] = useState('')

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
        const { code } = router.query
        if (code) {
            setCountriesList((code as string).split(','))
        }
    }, [router])

    useEffect(() => {
        if (countriesList.length || !loading) {
            fetchCompareData(countriesList)
        } else {
            setLoading(false)
        }
    }, [countriesList])

    const columns: TableColumnsProps<IApiCovidData>[] = [
        {
            title: 'Country',
            key: 'location',
        },
        {
            title: 'Actions',
            key: '',
            renderView: (row) => {
                console.log(row)
                return (
                    <div
                        className="flex justify-center"
                        onClick={() => {
                            console.log('DELETE ITEM', row.iso_code, [
                                ...countriesList.filter(
                                    (e) => e !== row.iso_code
                                ),
                            ])
                            setCountriesList([
                                ...countriesList.filter(
                                    (e) => e !== row.iso_code
                                ),
                            ])
                        }}
                    >
                        <span className="text-blue-600">DELETE</span>
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
                                    Select Attribute
                                </label>
                                <select
                                    className="bg-slate-200 px-2 py-2 py-2 text-slate-600 dark:bg-background-dark-alternate dark:text-slate-400"
                                    name="Select Attribute"
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setCurrentKey(e.target.value)
                                    }}
                                >
                                    {/* {Object.keys(data[0]).map((e) => {
                                        return (
                                            <option key={e} value={e}>
                                                {e.replaceAll('_', ' ')}
                                            </option>
                                        )
                                    })} */}

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
                                                        currentKey in d
                                                            ? (d as any)[
                                                                  currentKey
                                                              ]
                                                            : currentKey in rest
                                                            ? (rest as any)[
                                                                  currentKey
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
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

CountryHome.getLayout = function getLayout(page: React.ReactElement) {
    return <BasicLayout>{page}</BasicLayout>
}
export default CountryHome
