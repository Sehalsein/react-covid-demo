import StatsChartCard from '@/src/components/StatsChartCard'
import { DataSet } from '@/src/types/api/covid'

interface LatestStatsSectionProps {
    activeTab: string
    data?: DataSet[]
    setActiveTab: (tab: string) => void
}
const LatestStatsSection: React.FC<LatestStatsSectionProps> = ({
    activeTab,
    data,
    setActiveTab,
}) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <StatsChartCard
                isActive={activeTab === 'cases'}
                title="Cases"
                statValue={(data || []).reduce((a, b) => b.total_cases || a, 0)}
                primaryColor="#ef4444"
                className={`hover:bg-red-alpha ${
                    activeTab === 'cases' ? 'bg-red-alpha' : ''
                }`}
                onClick={() => {
                    setActiveTab('cases')
                }}
                dataset={(data || [])
                    .slice(-7)
                    .map(({ new_cases }) => new_cases || 0)}
            />
            <StatsChartCard
                isActive={activeTab === 'tests'}
                title="Tests"
                statValue={(data || []).reduce((a, b) => b.total_tests || a, 0)}
                primaryColor="#2563eb"
                className={`hover:bg-blue-alpha ${
                    activeTab === 'tests' ? 'bg-blue-alpha' : ''
                }`}
                onClick={() => {
                    setActiveTab('tests')
                }}
                dataset={(data || [])
                    .slice(-7)
                    .map(({ new_tests_smoothed }) => new_tests_smoothed || 0)}
            />
            <StatsChartCard
                isActive={activeTab === 'vaccinated'}
                title="Vaccinated"
                statValue={(data || []).reduce(
                    (a, b) => b.total_vaccinations || a,
                    0
                )}
                primaryColor="#16a34a"
                className={`hover:bg-green-alpha ${
                    activeTab === 'vaccinated' ? 'bg-green-alpha' : ''
                }`}
                onClick={() => {
                    setActiveTab('vaccinated')
                }}
                dataset={(data || [])
                    .slice(-7)
                    .map(
                        ({ new_people_vaccinated_smoothed }) =>
                            new_people_vaccinated_smoothed || 0
                    )}
            />
            <StatsChartCard
                title="Death"
                statValue={(data || []).reduce(
                    (a, b) => b.total_deaths || a,
                    0
                )}
                primaryColor="#94a3b8"
                className={`hover:bg-gray-alpha ${
                    activeTab === 'deceased' ? 'bg-gray-alpha' : ''
                }`}
                onClick={() => {
                    setActiveTab('deceased')
                }}
                dataset={(data || [])
                    .slice(-7)
                    .map(({ new_deaths_smoothed }) => new_deaths_smoothed || 0)}
            />
        </div>
    )
}

export default LatestStatsSection
