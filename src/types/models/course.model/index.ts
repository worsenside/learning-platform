import { ResponseEntityId } from 'types'
import { CertificateSettings } from './settings/certificate.model'
import { MarketplaceSettings } from './settings/marketplace.model'
import { CommunicationsSettings } from './settings/communications.model'

enum ReviewResponsibilityStatus {
	REQUIRED = 1,
	OPTIONAL
}

export interface ICourse {
	id: ResponseEntityId
	name: string
	description: string
	coverUrl?: string
	directionsIdList: ResponseEntityId[]
	teachersIdList: ResponseEntityId[]
	curatorsIdList: ResponseEntityId[]
	certificateSettings: CertificateSettings
	reviewResponsibilityStatus: ReviewResponsibilityStatus
	communicationsSettings: CommunicationsSettings
	marketplaceSettings: MarketplaceSettings
}
