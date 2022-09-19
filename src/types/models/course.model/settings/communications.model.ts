export interface CommunicationsSettings<T = CommunicationsInfoItem> {
	condition: T
	email: T
	phone: T
	whatsapp: T
	telegram: T
	instagram: T
	vk: T
}

export interface CommunicationsInfoItem {
	isActive: boolean
	text: string
}
