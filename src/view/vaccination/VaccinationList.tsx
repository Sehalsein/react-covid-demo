import { useVaccinationList } from '@/src/api/covid'
import Table, { TableColumnsProps } from '@/src/components/Table'
import { IApiVaccinationData } from '@/src/types/api/vaccination'
import Link from 'next/link'

const columns: TableColumnsProps<IApiVaccinationData>[] = [
    {
        title: 'Date',
        key: 'date',
    },
    {
        title: 'Vaccine',
        key: 'vaccine',
        renderView: (row) => {
            return (
                <div className="flex gap-2">
                    {row.vaccine?.split(',').map((val) => (
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
        title: 'Vaccinated',
        key: 'people_vaccinated',
        type: 'number',
    },
    {
        title: 'Source',
        key: 'source_url',
        renderView: (row) => {
            return (
                <Link href={row.source_url || ''} passHref>
                    <a target="_blank">
                        <span className="font-bold text-blue-600">view</span>
                    </a>
                </Link>
            )
        },
    },
]

interface VaccinationListProps {
    location: string
}

const VaccinationList: React.FC<VaccinationListProps> = ({ location }) => {
    const { data, loading } = useVaccinationList(location)
    return <Table columns={columns} data={data} loading={loading} />
}

export default VaccinationList
