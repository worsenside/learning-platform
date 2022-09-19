import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Column } from 'react-table'

import { Dropdown, Loader, TableDesktop, Avatar } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'

import { schoolQuery, userQuery } from 'store/queries'
import { UsersMobileTable } from 'containers/MobileTables'
import { useMatchMedia } from 'hooks'
import { ResponseEntityId } from 'types'
import { DropdownItem } from 'UI/Dropdown/types'
import { getUniqueId } from 'helpers'
import { UsersListFilter } from 'store/queries/user.query/types'
import { ConfirmDeleteUserModal } from 'components/Users/modals'

import { actionIconSrc, trashIconSrc, watchIconSrc } from './images/icons'

const UsersTable = () => {
	const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
		useState(false)
	const [currentDeletedUserId, setCurrentDeletedUserId] = useState<number>()
	const [usersCourses, setUsersCourses] = useState<UsersListFilter>({
		usersIdList: []
	})

	const navigate = useNavigate()

	const [deleteUserFromSchool] = schoolQuery.useDeleteUserFromSchoolMutation()
	const { data: schoolData } = schoolQuery.useGetSchoolQuery()
	const { data: schoolUsersList } = userQuery.useGetUsersQuery(usersCourses)

	const { isTable } = useMatchMedia()
	const clickViewHandler = useCallback((id) => {
		navigate(`/user/${id}`)
	}, [])
	const clickDeleteHandler = useCallback(() => {
		if (!currentDeletedUserId) {
			return
		}
		deleteUserFromSchool(currentDeletedUserId)
		setConfirmDeleteModalIsOpen(false)
	}, [currentDeletedUserId])

	const getDropdownItemsList = useCallback(
		(id: ResponseEntityId): DropdownItem[] => [
			{
				id: getUniqueId(),
				icon: watchIconSrc,
				label: 'Посмотреть сотрудника',
				onClick: clickViewHandler.bind(null, id)
			},
			{
				id: getUniqueId(),
				icon: trashIconSrc,
				label: 'Удалить',
				onClick: () => {
					setConfirmDeleteModalIsOpen(true)
					setCurrentDeletedUserId(id)
				}
			}
		],
		[clickViewHandler]
	)

	useEffect(() => {
		const school = schoolData
		if (!school) {
			return
		}

		setUsersCourses({
			usersIdList: school.data.usersIdList
		})
	}, [schoolData])

	const closeModalHandler = () => {
		setConfirmDeleteModalIsOpen(false)
	}

	const usersList = useMemo(() => {
		if (!schoolUsersList?.data) {
			return []
		}

		return schoolUsersList.data
	}, [schoolUsersList])

	const columns: Column<Record<string, unknown>>[] = useMemo(
		() => [
			{
				Header: 'Фото',
				accessor: 'photo',
				disableSortBy: true,
				Cell: ({ value, row }: any) => {
					const original = row.original as any
					return (
						<Avatar
							photoUrl={value}
							firstName={original.firstName}
							lastName={original.lastName}
						/>
					)
				}
			},
			{
				Header: 'Имя',
				accessor: 'firstName',
				disableSortBy: true
			},
			{
				Header: 'Фамилия',
				accessor: 'lastName',
				disableSortBy: true
			},
			{
				Header: 'Электроная почта',
				accessor: 'email',
				disableSortBy: true
			},
			{
				Header: 'Дата последней авторизация',
				accessor: 'dateLastLogin',
				disableSortBy: true
			},
			{ Header: 'Дата создания', accessor: 'dateCreated', disableSortBy: true },
			{
				Header: '',
				accessor: 'id',
				disableSortBy: true,
				Cell: ({ value: id }: { value: ResponseEntityId }) => (
					<Dropdown dropdownItemsList={getDropdownItemsList(id)}>
						<img src={actionIconSrc} alt="actions" />
					</Dropdown>
				)
			}
		],
		[getDropdownItemsList]
	)
	const data = Object.values(usersList) as unknown as Record<string, unknown>[]

	if (!data || !columns) {
		return <Loader styleTypes={[LoaderStyles.BIG]} />
	}

	return (
		<>
			{isTable ? (
				<UsersMobileTable
					getDropdownItemsList={getDropdownItemsList}
					data={data as []}
				/>
			) : (
				<TableDesktop data={data} columns={columns} />
			)}
			<ConfirmDeleteUserModal
				isOpen={confirmDeleteModalIsOpen}
				userName={(() => {
					const user = usersList.find(({ id }) => id === currentDeletedUserId)
					if (!user) {
						return ''
					}
					return `${user.firstName} ${user.lastName}`
				})()}
				onClose={closeModalHandler}
				onDelete={clickDeleteHandler}
			/>
		</>
	)
}

export default UsersTable
