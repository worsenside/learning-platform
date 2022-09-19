import React, { FC, useCallback, useEffect, useState } from 'react'

import { useDisableWindowScroll } from 'hooks'

import { NotificationsBar as NotificationsBarComponent } from 'components/Header'

const NotificationsBar: FC = () => {
	const [notificationsList, setNotificationsList] = useState([
		{
			id: '1',
			date: '22.12.2022',
			description:
				'Андрей Бирюков добавил ответ на задание на курсе «Охрана труда»',
			read: true
		},
		{
			id: '2',
			date: '22.12.2022',
			description:
				'Андрей Бирюков добавил ответ на задание на курсе «Охрана труда»',
			read: true
		},
		{
			id: '3',
			date: '22.12.2022',
			description:
				'Андрей Бирюков добавил ответ на задание на курсе «Охрана труда»',
			read: false
		},
		{
			id: '4',
			date: '22.12.2022',
			description:
				'Андрей Бирюков добавил ответ на задание на курсе «Охрана труда»',
			read: false
		}
	])
	// TODO RTKQ
	const [haveNewNotifications, setHaveNewNotifications] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	useDisableWindowScroll(isOpen)

	useEffect(() => {
		setHaveNewNotifications(notificationsList.some(({ read }) => !read))
	}, [notificationsList])

	const openHandler = useCallback(setIsOpen.bind(null, true), [])
	const closeHandler = useCallback(setIsOpen.bind(null, false), [])

	const readAllNotifications = useCallback(() => {
		setNotificationsList((prev) =>
			prev.map((notification) => ({ ...notification, read: true }))
		)
	}, [])

	return (
		<NotificationsBarComponent
			onClose={closeHandler}
			onOpen={openHandler}
			readAllNotifications={readAllNotifications}
			isOpen={isOpen}
			notificationsList={notificationsList}
			haveNewNotifications={haveNewNotifications}
		/>
	)
}

export default NotificationsBar
