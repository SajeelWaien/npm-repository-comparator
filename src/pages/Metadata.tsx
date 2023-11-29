import { useMemo } from 'react'
import Comparison2, { ColumnType } from './Comparison2';
import Comparison from './Comparison'
import { useQuery } from '@tanstack/react-query'
import { PackageDetailsResponse, Publisher, Repository } from '../types';
import { Typography, Flex } from 'antd';

const { Text, Link } = Typography;

type Props = {}

const columns: ColumnType[] = [
    { label: 'Package Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Keywords', key: 'keywords', render: (keywords: string[]) => <div>{keywords?.map((item, idx) => <Text>{item}{idx != keywords.length - 1 && ", " }</Text>) || null}</div> },
    { label: 'Repository', key: 'repository', render: (item: Repository) => <Link type='secondary' href={item.url} target="_blank">{item.url}</Link> },
    { label: 'License', key: 'license' },
    // { key: 'Last Modification Date', label: 'Last Modification Date' },
    { label: 'Authors/Publishers', key: 'publisher', render: (item: Publisher) => <Link type='secondary' href={item.email} target="_blank">{item.username}</Link> },
    { label: 'Maintainers', key: 'maintainers', render: (items: Publisher[]) => <Flex gap={'middle'}>{items.map((item) => <Link type='secondary' href={item.email} target="_blank">{item.username}</Link>)}</Flex> }
];

const Metadata = (props: Props) => {
    const { data, status } = useQuery<PackageDetailsResponse>({
        queryKey: ['npm-package-details']
    })

    const mappedData = useMemo(() => {
        if (data) {
            return Object.values(data).map((ele) => {
                return ele.collected.metadata
            })
        }
        else {
            return []
        }
    }, [data])

    if (status === 'success') {



        console.log("Metadata: ", data, mappedData, status)

        return (
            <Comparison columns={columns} dataItems={mappedData} />
        )
    }
}

export default Metadata