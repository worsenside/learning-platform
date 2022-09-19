import { getResponse } from 'helpers/api'

import {
	AuthorizationService as IAuthorizationService,
	AuthorizationApiRoutes
} from './types'

const AuthorizationService: IAuthorizationService = {
	authorize({ email, password }) {
		const apiUrl = AuthorizationApiRoutes.AUTHORIZE
		const body = {
			login: email,
			password
		}
		return getResponse(apiUrl, body)
	},
	refreshToken() {
		const apiUrl = AuthorizationApiRoutes.REFRESH_TOKEN
		return getResponse(apiUrl, null, { needAuth: true })
	}
}

export default AuthorizationService
