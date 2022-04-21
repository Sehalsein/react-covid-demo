import { renderCollection } from './renderCollection'

export interface TableColumnsProps<T> {
    title: string
    key: string
    renderView?: (row: T) => React.ReactNode | string
    type?: 'string' | 'number'
}

export interface TableProps<T> {
    columns: TableColumnsProps<T>[]
    loading?: boolean
    data?: T[]
    onRowClick?: (row: T) => void
}

const Table = <T,>({
    columns,
    loading = false,
    onRowClick,
    data,
}: React.PropsWithChildren<TableProps<T>>) => {
    return (
        <table className="w-full text-slate-600 dark:text-slate-400">
            <thead>
                <tr>
                    {columns.map(({ key, title: columnTitle }) => {
                        return (
                            <th
                                key={key}
                                className="rounded-md border-4 border-background-light bg-slate-200 px-2 py-4 text-slate-600 dark:border-background-dark dark:bg-background-dark-alternate  dark:text-slate-400"
                            >
                                {columnTitle}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {renderCollection(
                    data,
                    loading,
                    (row, index) => {
                        return (
                            <tr
                                key={index}
                                className="group cursor-pointer odd:bg-gray-200 even:bg-gray-100 dark:odd:dark:bg-background-dark dark:even:bg-background-dark-alternate dark:hover:bg-background-dark"
                                onClick={() => {
                                    if (onRowClick) {
                                        onRowClick(row)
                                    }
                                }}
                            >
                                {columns.map(
                                    ({ key, renderView, type }, index) => {
                                        return (
                                            <td
                                                className={`rounded-md border-4 border-background-light px-2 py-4 dark:border-background-dark dark:text-slate-400 ${
                                                    index === 0
                                                        ? 'dark:bg-[#1e1e30]'
                                                        : ''
                                                } group-hover:bg-slate-300 dark:group-hover:bg-background-dark`}
                                                key={key}
                                            >
                                                {renderView ? (
                                                    renderView(row)
                                                ) : (
                                                    <span>
                                                        {(row as any)[key]
                                                            ? typeof (
                                                                  row as any
                                                              )[key] ===
                                                              'number'
                                                                ? (row as any)[
                                                                      key
                                                                  ].toLocaleString()
                                                                : type ===
                                                                  'number'
                                                                ? parseFloat(
                                                                      (
                                                                          row as any
                                                                      )[key]
                                                                  ).toLocaleString()
                                                                : (row as any)[
                                                                      key
                                                                  ]
                                                            : '-'}
                                                    </span>
                                                )}
                                            </td>
                                        )
                                    }
                                )}
                            </tr>
                        )
                    },
                    () => {
                        return (
                            <tr>
                                <td className=" rounded-md  border-4 border-background-dark px-2 py-4 dark:odd:dark:bg-background-dark">
                                    No Data
                                </td>
                            </tr>
                        )
                    },
                    () => {
                        return (
                            <tr>
                                <td className="text-center">Loading</td>
                            </tr>
                        )
                    }
                )}
            </tbody>
        </table>
    )
}

export default Table
