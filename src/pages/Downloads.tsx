import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Line, LineConfig } from '@ant-design/charts'
import { PackageDetailsResponse } from '../types'
import { Typography } from 'antd'

const { Title } = Typography

type Props = {}

const Downloads = (props: Props) => {
    const { data, status } = useQuery<PackageDetailsResponse>({
        queryKey: ['npm-package-details'],
      })

    const mappedData = useMemo(() => {
        if(data) {
            return Object.entries(data)?.map(([key, ele]) => {
                return ele.collected.npm.downloads.map(record => ({ from: new Date(record.from).toISOString().split('T')[0], count: record.count, package: key }))
            })
        } else {
            return []
        }
    }, [data])

    if (status === 'success') {

        const config: LineConfig = {
            data: mappedData.flat().sort((a, b) => { if (a.from < b.from) { return -1 } else { return 1 } }),
            xField: 'from',
            yField: 'count',
            // seriesField: 'from',
            colorField: 'package',
            // point: {
            //     size: 5,
            //     shape: 'diamond',
            //     style: {
            //         fill: 'white',
            //         stroke: '#5B8FF9',
            //         lineWidth: 2,
            //     },
            // },
            label: {
                text: 'package',
                selector: 'last',
                style: {
                    fontSize: 10,
                },
            },
            tooltip: { channel: 'y' },
            state: {
                active: {
                    style: {
                        shadowBlur: 4,
                        stroke: '#000',
                        fill: 'red',
                    },
                },
            },
            interactions: [
                {
                    type: 'marker-active',
                },
            ],

        };

        return (
            <div style={{ backgroundColor: 'white' }}>
                <Title >Downloads</Title>
                <Line {...config} />
            </div>
        )
    }
}

export default Downloads