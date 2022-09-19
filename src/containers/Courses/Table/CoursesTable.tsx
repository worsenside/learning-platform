import React, { FC, useCallback, useMemo } from 'react'
import { Column } from 'react-table'

import { getUniqueId } from 'helpers'

import { Dropdown, TableDesktop } from 'UI'
import { DropdownItem } from 'UI/Dropdown/types'
import { NodeElementsId } from 'types'
import {
	actionIconSrc,
	trashIconSrc,
	watchIconSrc
} from 'containers/Users/Table/images/icons'
import { CoursesParams } from './types'

interface CoursesTableParams {
	data: CoursesParams[]
}

const CoursesTable: FC<CoursesTableParams> = ({ data }) => {
	const dropdownItemsList = useMemo(
		(): DropdownItem[] => [
			{
				id: getUniqueId(),
				icon: watchIconSrc,
				label: 'Посмотреть сотрудника',
				link: '/'
			},
			{
				id: getUniqueId(),
				icon: trashIconSrc,
				label: 'Удалить',
				link: '/school'
			}
		],
		[]
	)

	const handleActionClick = useCallback((id: NodeElementsId) => {
		console.log(id)
	}, [])

	const columns: Column<Record<string, unknown>>[] = useMemo(
		() => [
			{
				Header: 'Имя',
				accessor: 'name'
			},
			{
				Header: 'Описание',
				accessor: 'description'
			},
			{
				Header: '',
				accessor: 'id',
				Cell: ({ value }: any) => {
					const rowIdx = value
					return (
						<Dropdown dropdownItemsList={dropdownItemsList}>
							<img
								onClick={() => handleActionClick(rowIdx)}
								src={actionIconSrc}
								alt="actions"
							/>
						</Dropdown>
					)
				}
			}
		],
		[]
	)

	return (
		<TableDesktop
			columns={columns}
			data={data as unknown as Record<string, unknown>[]}
		/>
	)
}

export default CoursesTable
