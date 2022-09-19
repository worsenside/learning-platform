import { getResponse } from 'helpers/api'

import { UserService as IUserService, UserApiRoutes } from './types'

const UserService: IUserService = {
	changePassword(body) {
		const apiUrl = UserApiRoutes.CHANGE_PASSWORD

		return getResponse(apiUrl, body)
	}
}

export default UserService
