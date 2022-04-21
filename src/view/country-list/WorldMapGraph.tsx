import { IApiCovidData } from '@/src/types/api/covid'
import { scaleLinear } from 'd3-scale'
import { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'

interface WorldMapGraphProps {
    data: IApiCovidData[]
}

const geoUrl =
    'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const colorScale = scaleLinear()
    .domain([0, 49870086])
    //@ts-ignore
    .range(['#fca5a5', '#b91c1c'])

const WorldMapGraph: React.FC<WorldMapGraphProps> = ({ data }) => {
    const [content, setContent] = useState('')

    return (
        <>
            <ComposableMap
                data-tip=""
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    // scale: 147
                }}
            >
                {data.length > 0 && (
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const d = data.find(
                                    (s) => s.iso_code === geo.properties.ISO_A3
                                )
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            const { NAME } = geo.properties
                                            setContent(
                                                `${NAME} — ${(
                                                    d?.total_cases || 0
                                                ).toLocaleString()}`
                                            )
                                        }}
                                        onMouseLeave={() => {
                                            setContent('')
                                        }}
                                        style={{
                                            // default: {
                                            //     fill: '#D6D6DA',
                                            //     outline: 'none',
                                            // },
                                            hover: {
                                                fill: '#F53',
                                                outline: 'none',
                                            },
                                            pressed: {
                                                fill: '#E42',
                                                outline: 'none',
                                            },
                                        }}
                                        fill={
                                            d
                                                ? colorScale(
                                                      d.total_cases || 0
                                                  ).toString()
                                                : '#fca5a5'
                                        }
                                    />
                                )
                            })
                        }
                    </Geographies>
                )}
            </ComposableMap>
            <ReactTooltip>{content}</ReactTooltip>
        </>
    )
}

export default memo(WorldMapGraph)
