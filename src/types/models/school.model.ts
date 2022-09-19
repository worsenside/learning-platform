import { ResponseEntityId } from '..'

export interface IMainSchoolInfo {
	name: string
	description: string
	websiteUrl: string
}

export enum SchoolRoles {
	SCHOOL_ADMIN = 1,
	TUTOR = 2
}

export interface ISchool extends IMainSchoolInfo {
	id: ResponseEntityId
	avatarUrl: string
	ownerId: ResponseEntityId
	role: SchoolRoles
	tariffType: number
	// TODO Поменять на enum
	usersIdList: ResponseEntityId[]
	coursesIdList: ResponseEntityId[]
}
