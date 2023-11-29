import { Typography } from 'antd'
import { CSSProperties, Fragment, PropsWithChildren } from 'react';

const { Text } = Typography

export type ColumnType = {
    key: string,
    label: string,
    render?: Function
}

type PackagesType = {
    [k: string]: any
}

type Props = {
    columns: ColumnType[],
    dataItems: PackagesType[]
}

const cellStyle = {
    borderStyle: 'dotted',
    borderWidth: '1px',
    borderColor: 'darkgrey',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Cell = ({children, style}: PropsWithChildren<{style?: CSSProperties}>) => {
    return (
        <div style={{...cellStyle, ...style}}>
            {children}
        </div>
    )
}

const Comparison2 = (props: Props) => {
    const { columns, dataItems } = props

    const containerStyle = {
        boxShadow: '1px 1px 10px -5px black',
        margin: '10px',
        padding: '10px',
        display: 'grid',
        gridTemplateRows: `repeat(${columns.length}, minmax(80px, auto))`,
        gridAutoFlow: 'column',
        // gridGap: '6px',
        alignItems: 'center'
    }

    const renderItem = (item: PackagesType, col: ColumnType, idx: number) => {
        const render = col.render

        if (render) {
            console.log("Render: ", idx);
            return <Cell style={idx === 0 ? { backgroundColor: 'lightblue' } : {}}>{render(item[col.key])}</Cell>
        } else {
            return <Cell style={idx === 0 ? { backgroundColor: 'lightblue' } : {}}>{item[col.key]}</Cell>
        }
    }


    return (
        <div style={containerStyle}>
            {columns.map(column => {
                return <Cell><Text strong style={{color: 'cornflowerblue'}}>{column.label}</Text></Cell>
            })}
            {dataItems.map((item, idx) =>
                <Fragment key={idx}>{columns.map((column, idx) => {
                    return <Fragment key={idx}>{renderItem(item, column, idx)}</Fragment>
                })}</Fragment>

            )}
        </div>
    )
}

export default Comparison2