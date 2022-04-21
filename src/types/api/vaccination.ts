export interface IApiVaccinationCountry {
    location?: string
    iso_code?: string
    vaccines?: string
    last_observation_date?: Date
    source_name?: string
    source_website?: string
}

export interface IApiVaccinationData {
    location?: string
    date?: Date
    vaccine?: string
    source_url?: string
    total_vaccinations?: string
    people_vaccinated?: string
    people_fully_vaccinated?: string
    total_boosters?: string
}
