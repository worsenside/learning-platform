export interface CertificateTeacherSettings {
	isActive: boolean
	name: string
}

export interface CertificateSettings {
	type: CertificateTypes
	isActive: boolean
	templateInfo: CertificateTemplate
}

export enum CertificateTypes {
	DEFAULT = 1,
	CUSTOM
}

interface CertificateSchoolSettings {
	isActive: boolean
	schoolName: string
	signerPost: string
	signerName: string
}

interface CertificateTemplate {
	teacherSettings: CertificateTeacherSettings
	schoolSettings: CertificateSchoolSettings
}
