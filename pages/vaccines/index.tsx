import { useVaccinationCountryList } from '@/src/api/covid'
import BasicLayout from '@/src/components/Layout'
import Search from '@/src/components/Search'
import Table, { TableColumnsProps } from '@/src/components/Table'
import { IApiVaccinationCountry } from '@/src/types/api/vaccination'
import Link from 'next/link'
import { useRouter } from 'next/router'

const columns: TableColumnsProps<IApiVaccinationCountry>[] = [
    {
        title: 'Country',
        key: 'location',
    },
    {
        title: 'Vaccine',
        key: 'vaccine',
        renderView: (row) => {
            return (
                <div className="flex gap-2">
                    {row.vaccines?.split(',').map((val) => (
                        <div
                            key={val}
                            className="rounded-md bg-blue-200 px-2 py-1 text-xs font-bold text-blue-600"
                        >
                            <span>{val}</span>
                        </div>
                    ))}
                </div>
            )
        },
    },
    {
        title: 'Observation Date',
        key: 'last_observation_date',
    },
    {
        title: 'Source',
        key: 'source_website',
        renderView: (row) => {
            return (
                <Link href={row.source_website || ''} passHref>
                    <a target="_blank">
                        <span className="font-bold text-blue-600">
                            {row.source_name}
                        </span>
                    </a>
                </Link>
            )
        },
    },
]

const VaccinationListPage = () => {
    const { data, loading } = useVaccinationCountryList()
    const router = useRouter()

    return (
        <>
            <div className={`grid grid-cols-1`}>
                <div className="flex flex-col gap-6">
                    {data && (
                        <Search
                            data={data.map(({ location, iso_code }) => ({
                                value: location || '',
                                id: iso_code || '',
                            }))}
                        />
                    )}

                    <Table
                        columns={columns}
                        data={data}
                        loading={loading}
                        onRowClick={(row) => {
                            router.push(`/country/${row.iso_code}`)
                        }}
                    />
                </div>
                <h1>Table VaccinationListPage</h1>
            </div>
        </>
    )
}

VaccinationListPage.getLayout = function getLayout(page: React.ReactElement) {
    return <BasicLayout>{page}</BasicLayout>
}
export default VaccinationListPage
