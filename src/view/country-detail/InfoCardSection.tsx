import StatsInfoCard from '@/src/components/StatsInfoCard'
import { IApiCovidData } from '@/src/types/api/covid'

interface InfoCardSectionProps {
    data: IApiCovidData
}

const InfoCardSection: React.FC<InfoCardSectionProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {data.population && (
                <StatsInfoCard
                    title="Population"
                    statValue={data.population}
                    className="bg-red-alpha text-red-500"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique laboriosam dicta dolores quam quidem ad sunt inventore molestias corporis ea veniam error mollitia perspiciatis, consequuntur ipsa modi ex blanditiis!"
                />
            )}
            {data.population_density && (
                <StatsInfoCard
                    title="Population Density"
                    statValue={data.population_density}
                    className="bg-blue-alpha text-blue-600"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique laboriosam dicta dolores quam quidem ad sunt inventore molestias corporis ea veniam error mollitia perspiciatis, consequuntur ipsa modi ex blanditiis!"
                />
            )}
            {data.median_age && (
                <StatsInfoCard
                    title="Median Age"
                    statValue={data.median_age}
                    className="bg-green-alpha text-green-600"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique laboriosam dicta dolores quam quidem ad sunt inventore molestias corporis ea veniam error mollitia perspiciatis, consequuntur ipsa modi ex blanditiis!"
                />
            )}
            {data.handwashing_facilities && (
                <StatsInfoCard
                    title="Hand Washing Facilities"
                    statValue={data.handwashing_facilities}
                    className="bg-gray-alpha text-slate-400"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique laboriosam dicta dolores quam quidem ad sunt inventore molestias corporis ea veniam error mollitia perspiciatis, consequuntur ipsa modi ex blanditiis!"
                />
            )}
            {data.life_expectancy && (
                <StatsInfoCard
                    title="Life Expectancy"
                    statValue={data.life_expectancy}
                    className="bg-amber-alpha text-amber-600"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique laboriosam dicta dolores quam quidem ad sunt inventore molestias corporis ea veniam error mollitia perspiciatis, consequuntur ipsa modi ex blanditiis!"
                />
            )}
            {data.cardiovasc_death_rate && (
                <StatsInfoCard
                    title="Cardio Vascular Death Rate"
                    statValue={data.cardiovasc_death_rate}
                    className="bg-purple-alpha text-purple-600"
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio similique laboriosam dicta dolores quam quidem ad sunt inventore molestias corporis ea veniam error mollitia perspiciatis, consequuntur ipsa modi ex blanditiis!"
                />
            )}
        </div>
    )
}

export default InfoCardSection
