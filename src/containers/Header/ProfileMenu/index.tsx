import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUniqueId } from 'helpers'
import { useActions, useAppSelector } from 'hooks/redux'
import { userQuery } from 'store/queries'
import { ProfileMenu as ProfileMenuComponent } from 'components/Header'
import { DropdownItem } from 'UI/Dropdown/types'

import {
	profileIconSrc,
	schoolIconSrc,
	notificationIconSrc,
	logoutIconSrc
} from 'components/Header/ProfileMenu/images/icons'

const ProfileMenu = () => {
	const navigate = useNavigate()
	const { token } = useAppSelector((state) => state.system)
	const { logOut } = useActions((state) => state.system)
	const { data: userInfo } = userQuery.useGetYourselfQuery(token)

	const logOutHandler = useCallback(() => {
		logOut()
		navigate('/')
	}, [logOut])

	const dropdownItemsList = useMemo<DropdownItem[]>(
		() => [
			{
				id: getUniqueId(),
				icon: profileIconSrc,
				label: 'Настройки профиля',
				link: '/profile/user'
			},
			{
				id: getUniqueId(),
				icon: schoolIconSrc,
				label: 'Настройки школы',
				link: '/profile/school'
			},
			{
				id: getUniqueId(),
				icon: notificationIconSrc,
				label: 'Настроить уведомления',
				link: '/notifications'
			},
			{
				id: getUniqueId(),
				icon: logoutIconSrc,
				label: 'Выйти',
				onClick: logOutHandler
			}
		],
		[logOutHandler]
	)

	return (
		<ProfileMenuComponent
			avatarParams={{
				photoUrl: userInfo?.data.avatarUrl as string,
				lastName: userInfo?.data.lastName,
				firstName: userInfo?.data.firstName
			}}
			dropdownTitle="Вы сейчас в школе «Програминг»"
			// TODO Сделать актуальным
			dropdownItemsList={dropdownItemsList}
		/>
	)
}
export default ProfileMenu
