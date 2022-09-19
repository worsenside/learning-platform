import { ResponseEntityId } from '..'

export interface IMainUserInfo {
	firstName: string
	lastName: string
	phone: string
	aboutMe: string
	city: string
	email: string
	birthDate: Date
}

export interface IUser extends IMainUserInfo {
	id: ResponseEntityId
	avatarUrl: string
	createdDate: Date
	lastLoginDate: Date
	login: string
}
