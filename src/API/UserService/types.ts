export interface UserService {
	changePassword: ChangePassword
}

export interface ChangePasswordParams {
	oldPassword: string
	newPassword: string
}

type ChangePassword = (params: ChangePasswordParams) => Promise<void>

export enum UserApiRoutes {
	CHANGE_PASSWORD = 'users/change-pass'
}
