import { IApiCovidData } from '@/src/types/api/covid'
import {
    IApiVaccinationCountry,
    IApiVaccinationData,
} from '@/src/types/api/vaccination'
import useSWR, { SWRConfiguration } from 'swr'

export function useCountryList(options?: SWRConfiguration) {
    const { data, error } = useSWR<IApiCovidData[]>('/api/country', options)
    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}

export function useCountryDetail(id?: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<IApiCovidData>(
        id ? `/api/country/${id}` : null,
        options
    )
    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}

export function useVaccinationList(id?: string, options?: SWRConfiguration) {
    const { data, error } = useSWR<IApiVaccinationData[]>(
        id ? `/api/vaccination/${id}` : null,
        options
    )
    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}

export function useVaccinationCountryList(options?: SWRConfiguration) {
    const { data, error } = useSWR<IApiVaccinationCountry[]>(
        '/api/vaccination',
        options
    )
    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
