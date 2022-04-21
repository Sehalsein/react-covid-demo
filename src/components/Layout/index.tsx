import Link from 'next/link'
import { useRouter } from 'next/router'

interface BasicLayoutProps {
    children: React.ReactNode
}

const menu = [
    {
        title: 'Countries',
        path: '/country',
    },
    {
        title: 'Vaccine',
        path: '/vaccines',
    },
    {
        title: 'Compare',
        path: '/compare',
    },
]

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    const router = useRouter()
    return (
        <div className=" bg-background-light dark:bg-background-dark">
            <header className="flex justify-end gap-6  px-12 py-4 ">
                {menu.map(({ title, path }) => (
                    <div
                        key={path}
                        className={`cursor-pointer rounded-md px-3 py-2 font-medium dark:text-white ${
                            router.pathname.includes(path)
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-600'
                        }`}
                    >
                        <Link href={path} passHref>
                            <span>{title}</span>
                        </Link>
                    </div>
                ))}
            </header>
            <main className="px-4 py-6">{children}</main>
        </div>
    )
}

export default BasicLayout
