import BasicLayout from '@/src/components/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/country')
    }, [])

    return <></>
}

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <BasicLayout>{page}</BasicLayout>
}
export default Home
