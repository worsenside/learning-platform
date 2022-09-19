import { ResponseEntityId } from 'types'

export interface MarketplaceSettings {
	isActive: boolean
	priceSettings: PriceSettings
	studyFormatId: ResponseEntityId
	dateLearningSettings: DateLearningSettings
	announcementDescription: string
	documentNameAfterLearning: string
	employmentDescription: string
	corporateLearningSettings: CorporateLearningSettings
}

interface PriceSettings {
	isActive: boolean
	price: number
}

interface DateLearningSettings {
	isActive: boolean
	start: Date
	end: Date
}

export interface CorporateLearningSettings {
	isActive: boolean
	phone: string
	email: string
}
