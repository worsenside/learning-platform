import React, { FC, useEffect } from 'react'

import { AsideBar as AsideBarComponent } from 'components'
import { AsideBarOption } from 'components/AsideBar/types'
import {
	CoursesIcon,
	TariffsIcon,
	TimetableIcon,
	UsersIcon
} from 'components/AsideBar/images'
import useAsideBarContext from 'contexts/AsideBar.context'
import { useMatchMedia } from 'hooks'

interface AsideBarProps {}

export const iconsList = {
	CoursesIcon: <CoursesIcon />,
	UsersIcon: <UsersIcon />,
	TariffsIcon: <TariffsIcon />,
	TimetableIcon: <TimetableIcon />
}

const asideBarOptionsList: AsideBarOption[] = [
	{
		id: 1,
		labelText: 'Курсы',
		link: '/',
		icon: <CoursesIcon />
	},
	{
		id: 2,
		labelText: 'Расписание',
		link: '/timetable',
		icon: <TimetableIcon />
	},
	{
		id: 3,
		labelText: 'Пользователи',
		link: '/user/list',
		icon: <UsersIcon />
	},
	{
		id: 4,
		labelText: 'Тарифы',
		link: '/tariffs',
		icon: <TariffsIcon />
	}
]

const AsideBar: FC<AsideBarProps> = () => {
	const { setAsideIsOpen } = useAsideBarContext()
	const { isTablet } = useMatchMedia()

	useEffect(() => {
		setAsideIsOpen(!isTablet)
	}, [isTablet])
	return <AsideBarComponent asideBarOptionsList={asideBarOptionsList} />
}

export default AsideBar
