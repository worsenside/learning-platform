import React, { FC, useMemo } from 'react'

import { Column } from 'react-table'
import { Loader, TableDesktop } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'
import { CoursesInfo } from '../types'

interface UsersCoursesTableProps {
	courses: CoursesInfo[]
	className: string
}

const CoursesTable: FC<UsersCoursesTableProps> = ({ courses, className }) => {
	const columns: Column<Record<string, unknown>>[] = useMemo(
		() => [
			{
				Header: 'Название курса',
				accessor: 'name',
				disableSortBy: false
			},
			{ Header: 'Роль', accessor: 'role', disableSortBy: false }
		],
		[]
	)

	const data = courses as unknown as Record<string, unknown>[]

	if (!data || !columns) {
		return <Loader styleTypes={[LoaderStyles.BIG]} />
	}
	return <TableDesktop className={className} data={data} columns={columns} />
}

export default CoursesTable
