import { Table, Flex, List } from 'antd'
import { PackageDetailsResponse } from '../types';

export type ColumnType = {
    key: string,
    label: string,
    render?: Function
}

type Props = {
    // packages?: PackageDetailsResponse
    columns: ColumnType[],
    dataItems: {
        [k: string]: any
    }[]
}

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'react-query',
        dataIndex: 'react-query',
        key: 'react-query',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const Comparison2 = (props: Props) => {
    const { columns, dataItems } = props

    const columnKeys = columns.map(col => col.key)
    
    return (
        <Flex>
            <List
                size="large"
                header={<div></div>}
                // bordered
                dataSource={columns}
                renderItem={(item) => <List.Item>{item.label}</List.Item>}
            />
            { dataItems.map((item, idx) =>
                <List
                    key={idx}
                    size="large"
                    header={<div></div>}
                    // bordered
                    // dataSource={Object.entries(item).filter(field => columnKeys.includes(field[0]))}
                    dataSource={columns}
                    renderItem={(col, idx) => {
                        // const render = columns.find((col) => col.key === item[0])?.render || null
                        // console.log("ITEM: ", columns, item, render);
                        const render = col.render
                        
                        if(render) {
                            console.log("Render: ", render);
                            return <List.Item key={idx}>{render(item[col.key])}</List.Item>
                        } else {
                            return <List.Item key={idx}>{item[col.key]}</List.Item>
                        }
                    }}
                />
            )}
        </Flex>
    )
}

export default Comparison2