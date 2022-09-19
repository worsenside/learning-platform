import { getResponse } from 'helpers/api'
import {
	PasswordRecoveryService as IPasswordRecoveryService,
	PasswordRecoveryApiRoutes
} from './types'

const PasswordRecoveryService: IPasswordRecoveryService = {
	async start(body) {
		const apiUrl = PasswordRecoveryApiRoutes.START_PASSWORD_RECOVERY
		const params = {
			method: 'PATCH'
		}

		return getResponse(apiUrl, body, params)
	},
	async checkCode(body) {
		const apiUrl = PasswordRecoveryApiRoutes.CHECK_PASSWORD_RECOVERY_CODE
		const params = {
			method: 'PATCH'
		}

		return getResponse(apiUrl, body, params)
	},
	async finish(body) {
		const apiUrl = PasswordRecoveryApiRoutes.FINISH_PASSWORD_RECOVERY
		const params = {
			method: 'PATCH'
		}

		return getResponse(apiUrl, body, params)
	}
}

export default PasswordRecoveryService
