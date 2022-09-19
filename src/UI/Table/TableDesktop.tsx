import React, { PropsWithChildren, ReactElement } from 'react'
import { Column, useTable } from 'react-table'
import classnames from 'classnames'

import cl from './style.module.scss'

interface TableProps<T extends Record<string, unknown>> {
	className?: string
	columns: readonly Column<T>[]
	data: T[]
}

const TableDesktop = <T extends Record<string, unknown>>(
	props: PropsWithChildren<TableProps<T>>
): ReactElement => {
	const { className, columns, data } = props
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable({ columns, data })
	return (
		<div className={cl.container}>
			<table className={classnames('Table', className)} {...getTableProps()}>
				<thead className={cl.tableHeader}>
					{headerGroups.map((headerGroup) => (
						<tr className={cl.tr} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th className={cl.th} {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className={cl.tableBody} {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)
						return (
							<tr className={cl.tr} {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td className={cl.td} {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								))}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default TableDesktop
