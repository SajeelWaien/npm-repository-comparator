import { useMemo, Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LanguagesResponse } from '../types';
import { Flex, Typography } from 'antd';
import { Pie, PieConfig } from '@ant-design/plots';

const { Title } = Typography

type Props = {}

type MappedData = {
    language: string;
    bytes: number;
}

const Languages = (props: Props) => {
    const { data, status } = useQuery<LanguagesResponse[]>({
        queryKey: ['languages-list'],
    })

    const mappedData: MappedData[][] = useMemo(() => {
        return data?.map((ele) => {
            return Object.entries(ele).map(([key, value]) => ({ language: key, bytes: value }))
        }) || []
    }, [data])

    if (status === 'success') {
        const config: PieConfig = {
            // data: [
            //     { type: '分类一', value: 27 },
            //     { type: '分类二', value: 25 },
            //     { type: '分类三', value: 18 },
            // ],
            angleField: 'bytes',
            colorField: 'language',
            paddingRight: 80,
            paddingTop: 30,
            paddingBottom: 30,
            label: {
                text: (d: MappedData) => `${d.language} - ${d.bytes}`,
                position: 'outside',
                style: {
                    fontWeight: 'bold',
                },
            },
            legend: {
                color: {
                    title: false,
                    position: 'right',
                    rowPadding: 5,
                },
            },
        };

        return (
            <Flex vertical style={{ backgroundColor: 'white' }}>
                <Title >Languages</Title>
                <Flex style={{ maxHeight: 300 }}>
                    {mappedData.map((chart, idx) => <Fragment key={idx}><Pie {...config} data={chart} /></Fragment>)}
                </Flex>
            </Flex>
        )
    }
}

export default Languages