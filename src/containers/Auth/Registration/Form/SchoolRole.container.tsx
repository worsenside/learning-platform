import React, { FC, useEffect, useState } from 'react'

import { useActions } from 'hooks/redux'

import { SchoolRoles } from 'types/models/school.model'
import RegistrationFormSchoolRoleComponent from 'components/Auth/Registration/Form/SchoolRole.component'
import { RegistrationFormBaseProps, RegistrationSteps } from './types'

interface RegistrationFormSchoolRoleProps extends RegistrationFormBaseProps {}

const RegistrationFormSchoolRole: FC<RegistrationFormSchoolRoleProps> = ({
	onChangeRegistrationStep
}) => {
	const [schoolRole, setSchoolRole] = useState<SchoolRoles>()

	const { chooseSchoolRole } = useActions((state) => state.registration)

	useEffect(() => {
		if (!schoolRole) {
			return
		}

		chooseSchoolRole(schoolRole)
		onChangeRegistrationStep(RegistrationSteps.START_REGISTRATION_STEP)
	}, [schoolRole])

	return <RegistrationFormSchoolRoleComponent onChange={setSchoolRole} />
}

export default RegistrationFormSchoolRole
