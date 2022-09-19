import React, { FC } from 'react'

import { useMatchMedia } from 'hooks'

import emptyNotificationsIcon from './images/notifications.svg'
import newNotificationsIcon from './images/newNotifications.svg'
import cl from './style.module.scss'

interface OpenNotificationsBarButtonProps {
	haveNewNotifications?: boolean
	onClick?: () => void
}

const OpenNotificationsBarButton: FC<OpenNotificationsBarButtonProps> = ({
	haveNewNotifications,
	children,
	...defaultProps
}) => {
	const { isMobile } = useMatchMedia()
	return (
		<button
			className={cl.buttonToggle}
			aria-label="Показать уведомления"
			{...defaultProps}
		>
			<img
				src={
					haveNewNotifications ? newNotificationsIcon : emptyNotificationsIcon
				}
				alt="empty-notifications"
			/>
			{isMobile && children}
		</button>
	)
}

export default OpenNotificationsBarButton
