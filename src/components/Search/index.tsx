import { useState } from 'react'
import { renderCollection } from '../Table/renderCollection'

interface SearchData {
    id: string
    value: string
}
interface SearchProps {
    data: SearchData[]
    onSelect: (data: SearchData) => void
}

const Search: React.FC<SearchProps> = ({ data, onSelect }) => {
    const [search, setSearch] = useState('')

    return (
        <div className="flex flex-col gap-2">
            <div className="m-auto flex w-full max-w-3xl items-center gap-4 rounded-md bg-slate-200 px-2 py-2 text-left text-slate-600 focus-within:outline-0 focus:border-blue-300  focus:bg-blue-200 focus:ring-0 dark:bg-background-dark-alternate dark:text-slate-400">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    className="flex-1 bg-slate-200 py-2 text-slate-600 dark:bg-background-dark-alternate dark:text-slate-400"
                    placeholder="Search your country"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {search && (
                <div className="m-auto flex w-full max-w-3xl flex-col divide-y divide-solid divide-slate-200 rounded-md dark:divide-background-dark dark:bg-background-dark-alternate dark:text-slate-400">
                    {renderCollection(
                        data
                            .filter(({ value }) =>
                                value
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .slice(0, 4),
                        false,
                        ({ id, value }) => {
                            return (
                                <div
                                    key={id}
                                    className="flex cursor-pointer items-center justify-between py-4 px-4 hover:bg-slate-100 dark:hover:bg-background-dark"
                                    onClick={() => {
                                        setSearch('')
                                        onSelect({ id, value })
                                    }}
                                >
                                    <span className="">{value}</span>
                                    <div className="rounded-md bg-blue-200 px-2 py-1 text-xs font-bold text-blue-600">
                                        <span>{id}</span>
                                    </div>
                                </div>
                            )
                        },
                        () => {
                            return (
                                <span className="flex cursor-pointer items-center justify-between py-4 px-4 hover:bg-slate-100">
                                    No Data
                                </span>
                            )
                        }
                    )}
                </div>
            )}
        </div>
    )
}

export default Search
