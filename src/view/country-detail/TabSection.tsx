import { IApiCovidData } from '@/src/types/api/covid'
import VaccinationList from '@/src/view/vaccination/VaccinationList'
import { useState } from 'react'

interface TabSectionProps {
    data: IApiCovidData
}
const TabSection: React.FC<TabSectionProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState('vaccination')
    return (
        <>
            <div className="flex gap-2">
                <div
                    className={`cursor-pointer rounded-md ${
                        activeTab === 'vaccination' ? 'bg-red-alpha' : ''
                    } px-6 py-3 text-red-500`}
                    onClick={() => {
                        setActiveTab('vaccination')
                    }}
                >
                    <span>Vaccination</span>
                </div>
                {/* <div
                    className={`cursor-pointer rounded-md ${
                        activeTab === 'state' ? 'bg-blue-alpha' : ''
                    } px-6 py-3 text-blue-500`}
                    onClick={() => {
                        setActiveTab('state')
                    }}
                >
                    <span>State</span>
                </div> */}
            </div>

            {activeTab === 'vaccination' && data.location && (
                <VaccinationList location={data.location} />
            )}
        </>
    )
}

export default TabSection
