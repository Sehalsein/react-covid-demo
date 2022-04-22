import axios from '@/src/lib/axios'
import {
    IApiLoginRequestBody,
    IApiLoginResponse,
    IApiUserProfile,
} from '@/src/types/api/auth'
import useSWR, { SWRConfiguration } from 'swr'

export function login(payload: IApiLoginRequestBody) {
    return axios
        .post<IApiLoginResponse>(`/api/auth/login`, payload)
        .then((res) => res.data)
}

export function useCurrentUser(options?: SWRConfiguration) {
    const { data, error, mutate } = useSWR<IApiUserProfile>(
        '/api/user/profile',
        options
    )
    return {
        data: data,
        loading: !error && !data,
        error: error,
        mutate,
    }
}

export function latestSearch(payload: any) {
    return axios
        .patch(`/api/user/search-stats`, payload)
        .then((res) => res.data)
}
