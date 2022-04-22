import { LOCAL_STORAGE_TOKEN_KEY } from '@/src/constant/auth'
import { useAuth } from '@/src/hooks/useAuth'
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
]

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    const router = useRouter()
    const { isLoggedIn } = useAuth()
    return (
        <div className=" bg-background-light dark:bg-background-dark">
            <header className="item-center flex justify-end  gap-6 px-12 py-4">
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

                {!isLoggedIn && (
                    <button
                        data-for="login-button"
                        className="rounded-md px-6 py-2 font-medium uppercase text-red-500"
                        onClick={() => {
                            router.push('/login')
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
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                )}
                {isLoggedIn && (
                    <>
                        <button
                            className="rounded-md px-6 py-2 font-medium uppercase text-red-500"
                            onClick={() => {
                                localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
                                router.push('/login')
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
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                    </>
                )}
            </header>
            <main className="px-4 py-6">{children}</main>
        </div>
    )
}

export default BasicLayout
