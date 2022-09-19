import { getResponse } from 'helpers/api'

import { SchoolService as ISchoolService, SchoolApiRoutes } from './types'

const SchoolService: ISchoolService = {
	inviteUser(body) {
		const apiUrl = SchoolApiRoutes.INVITE_USER

		return getResponse(apiUrl, body)
	}
}

export default SchoolService
