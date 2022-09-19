import { getResponse } from 'helpers/api'

import {
	RegistrationService as IRegistrationService,
	RegistrationApiRoutes
} from './types'

const RegistrationService: IRegistrationService = {
	async start(body) {
		const apiUrl = RegistrationApiRoutes.START_REGISTRATION

		return getResponse(apiUrl, body)
	},
	async break({ email }) {
		const apiUrl = `${RegistrationApiRoutes.BREAK_REGISTRATION}/${email}`
		// TODO ROUTE-REFACTOR REG_BREAK?email=${email}
		const params = {
			method: 'DELETE'
		}

		return getResponse(apiUrl, null, params)
	},
	async repeatCode(body) {
		const apiUrl = RegistrationApiRoutes.REPEAT_REGISTRATION_CODE

		return getResponse(apiUrl, body)
	},
	async checkCode(body) {
		const apiUrl = RegistrationApiRoutes.CHECK_REGISTRATION_CODE

		return getResponse(apiUrl, body)
	},
	async finish(body) {
		const apiUrl = RegistrationApiRoutes.FINISH_REGISTRATION

		return getResponse(apiUrl, body)
	}
}

export default RegistrationService
