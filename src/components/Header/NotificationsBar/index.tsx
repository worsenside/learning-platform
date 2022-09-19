import React, { FC } from 'react'

import OpenNotificationsBarButton from './OpenNotificationsBarButton'
import NotificationsList from './NotificationsList'

import { NotificationsListProps } from './types'

interface NotificationsBarProps extends NotificationsListProps {
	onOpen: () => void
	haveNewNotifications: boolean
}

const NotificationsBar: FC<NotificationsBarProps> = ({
	isOpen,
	notificationsList,
	onOpen,
	onClose,
	readAllNotifications,
	haveNewNotifications
}) => (
	<>
		<OpenNotificationsBarButton
			haveNewNotifications={haveNewNotifications}
			onClick={onOpen}
		>
			Уведомления
		</OpenNotificationsBarButton>
		{isOpen && (
			<NotificationsList
				isOpen={isOpen}
				notificationsList={notificationsList}
				onClose={onClose}
				readAllNotifications={readAllNotifications}
			/>
		)}
	</>
)

export default NotificationsBar
