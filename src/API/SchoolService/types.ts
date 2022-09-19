export interface SchoolService {
	inviteUser: InviteUser
}

export interface InviteUserParams {
	email: string
}
type InviteUser = (params: InviteUserParams) => Promise<void>

export enum SchoolApiRoutes {
	INVITE_USER = 'schools/invite-user'
}
