export interface IApiCovidData {
    iso_code: string
    continent?: Continent
    location: string
    population?: number
    population_density?: number
    median_age?: number
    aged_65_older?: number
    aged_70_older?: number
    gdp_per_capita?: number
    cardiovasc_death_rate?: number
    diabetes_prevalence?: number
    handwashing_facilities?: number
    hospital_beds_per_thousand?: number
    life_expectancy?: number
    human_development_index?: number
    date: string
    total_cases?: number
    new_cases?: number
    total_cases_per_million?: number
    new_cases_per_million?: number
    stringency_index?: number
    new_cases_smoothed?: number
    new_cases_smoothed_per_million?: number
    total_deaths?: number
    new_deaths?: number
    total_deaths_per_million?: number
    new_deaths_per_million?: number
    new_deaths_smoothed?: number
    new_deaths_smoothed_per_million?: number
    reproduction_rate?: number
    total_vaccinations?: number
    people_vaccinated?: number
    total_vaccinations_per_hundred?: number
    people_vaccinated_per_hundred?: number
    new_vaccinations_smoothed?: number
    new_vaccinations_smoothed_per_million?: number
    new_people_vaccinated_smoothed?: number
    new_people_vaccinated_smoothed_per_hundred?: number
    people_fully_vaccinated?: number
    people_fully_vaccinated_per_hundred?: number
    new_vaccinations?: number
    total_tests?: number
    total_tests_per_thousand?: number
    tests_units?: TestsUnits
    new_tests_smoothed?: number
    new_tests_smoothed_per_thousand?: number
    positive_rate?: number
    tests_per_case?: number
    total_boosters?: number
    total_boosters_per_hundred?: number
    extreme_poverty?: number
    female_smokers?: number
    male_smokers?: number
    new_tests?: number
    new_tests_per_thousand?: number
    excess_mortality_cumulative_absolute?: number
    excess_mortality_cumulative?: number
    excess_mortality?: number
    excess_mortality_cumulative_per_million?: number
    icu_patients?: number
    icu_patients_per_million?: number
    hosp_patients?: number
    hosp_patients_per_million?: number
    weekly_hosp_admissions?: number
    weekly_hosp_admissions_per_million?: number
    weekly_icu_admissions?: number
    weekly_icu_admissions_per_million?: number
    data?: DataSet[]
}

export interface DataSet {
    date?: string
    total_cases?: number
    new_cases?: number
    total_cases_per_million?: number
    new_cases_per_million?: number
    stringency_index?: number
    new_cases_smoothed?: number
    new_cases_smoothed_per_million?: number
    total_deaths?: number
    new_deaths?: number
    total_deaths_per_million?: number
    new_deaths_per_million?: number
    new_deaths_smoothed?: number
    new_deaths_smoothed_per_million?: number
    reproduction_rate?: number
    total_vaccinations?: number
    people_vaccinated?: number
    total_vaccinations_per_hundred?: number
    people_vaccinated_per_hundred?: number
    new_vaccinations_smoothed?: number
    new_vaccinations_smoothed_per_million?: number
    new_people_vaccinated_smoothed?: number
    new_people_vaccinated_smoothed_per_hundred?: number
    people_fully_vaccinated?: number
    people_fully_vaccinated_per_hundred?: number
    new_vaccinations?: number
    total_tests?: number
    total_tests_per_thousand?: number
    tests_units?: TestsUnits
    new_tests_smoothed?: number
    new_tests_smoothed_per_thousand?: number
    positive_rate?: number
    tests_per_case?: number
}

export enum Continent {
    Africa = 'Africa',
    Asia = 'Asia',
    Europe = 'Europe',
    NorthAmerica = 'North America',
    Oceania = 'Oceania',
    SouthAmerica = 'South America',
}

export enum TestsUnits {
    PeopleTested = 'people tested',
    SamplesTested = 'samples tested',
    TestsPerformed = 'tests performed',
    UnitsUnclear = 'units unclear',
}
