import React, { FC } from 'react'

import cl from './style.module.scss'
import { Notification } from './types'

interface NotificationsListItemProps extends Notification {}

const NotificationsListItem: FC<NotificationsListItemProps> = ({
	id,
	description,
	read,
	date
}) => (
	<div key={id} className={cl.contentItem}>
		<div className={cl.descriptionContainer}>
			<span>{description}</span>
			<div className={read ? cl.readIndicatorEmpty : cl.readIndicatorFill} />
		</div>
		<p className={cl.date}>{date}</p>
	</div>
)

export default NotificationsListItem
