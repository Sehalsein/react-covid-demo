import { useAuth } from '@/src/hooks/useAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LoginPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    return (
        <div className="flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="flex w-full max-w-lg flex-col gap-12 rounded-lg bg-background-light px-6 py-24 shadow-xl dark:bg-background-dark-alternate">
                <div>
                    <h1 className="text-5xl font-bold text-slate-600 dark:text-slate-200">
                        Login
                    </h1>
                </div>

                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="flex-1 rounded-md bg-slate-200 py-4 px-4 text-slate-600 dark:bg-background-dark dark:text-slate-400"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="flex-1 rounded-md bg-slate-200 py-4 px-4 text-slate-600 dark:bg-background-dark dark:text-slate-400"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />

                    <button
                        disabled={loading}
                        className="mt-4 rounded-md bg-blue-600 px-2 py-2 font-bold uppercase text-white"
                        onClick={() => {
                            setLoading(true)

                            login(email, password)
                                .then(() => {
                                    router.push('/country')
                                })
                                .catch(() => {
                                    alert('Error')
                                })
                                .finally(() => {
                                    setLoading(false)
                                })
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
