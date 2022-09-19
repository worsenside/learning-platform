import React, { FC, useRef } from 'react'
import classnames from 'classnames'

import { useOnClickOutside } from 'hooks'

import NotificationsListItem from './NotificationsListItem'
import { NotificationsListProps } from './types'

import closeIcon from './images/closeIcon.svg'
import cl from './style.module.scss'

const NotificationsList: FC<NotificationsListProps> = ({
	notificationsList,
	isOpen = false,
	onClose,
	readAllNotifications
}) => {
	const notificationsContainerStyles = classnames([cl.container], {
		[cl.containerIsOpen]: isOpen
	})

	const notificationsContainer = useRef(null)
	useOnClickOutside(notificationsContainer, onClose)

	return (
		<div className={notificationsContainerStyles}>
			<div ref={notificationsContainer} className={cl.content}>
				<div className={cl.header}>
					<span>Уведомления</span>
					<button onClick={onClose} className={cl.closeIcon}>
						<img src={closeIcon} alt="close" />
					</button>
				</div>
				<div className={cl.readBtnContainer}>
					<button
						onClick={readAllNotifications}
						aria-label="Отметить как все прочитанные"
					>
						Отметить как все прочитанные
					</button>
				</div>
				{notificationsList.map((notificationsListItem) => (
					<NotificationsListItem
						key={notificationsListItem.id}
						{...notificationsListItem}
					/>
				))}
			</div>
		</div>
	)
}

export default NotificationsList
