export interface Notification {
	id: number | string
	date: string
	description: string
	read: boolean
}

export interface NotificationsListProps {
	notificationsList: Notification[]
	isOpen: boolean
	onClose: () => void
	readAllNotifications: () => void
}
