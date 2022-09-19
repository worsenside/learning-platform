import React, { FC, useMemo } from 'react'

import RegistrationFormWrapperComponent from 'components/Auth/Registration/Form/Wrapper.component'
import { RegistrationSteps } from 'containers/Auth/Registration/Form/types'
import RegistrationFormSchoolRole from './SchoolRole.container'
import RegistrationFormStart from './Start.container'
import RegistrationFormRepeatCode from './RepeatCode.container'
import RegistrationFormFinish from './Finish.container'

interface RegistrationFormWrapperProps {
	registrationStep: RegistrationSteps
	onChangeRegistrationStep: (step: RegistrationSteps) => void
}
const RegistrationFormWrapper: FC<RegistrationFormWrapperProps> = ({
	registrationStep,
	onChangeRegistrationStep
}) => {
	const registrationFormTitle = useMemo(() => {
		switch (registrationStep) {
			case RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP:
				return 'Регистрация'
			case RegistrationSteps.START_REGISTRATION_STEP:
				return 'Регистрация'
			case RegistrationSteps.REPEAT_REGISTRATION_CODE_STEP:
				return 'Проверьте почту'
			case RegistrationSteps.FINISH_REGISTRATION_STEP:
				return 'Придумайте пароль'
			default:
				return ''
		}
	}, [registrationStep])

	const RegistrationFormContent = useMemo(() => {
		switch (registrationStep) {
			case RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP:
				return RegistrationFormSchoolRole
			case RegistrationSteps.START_REGISTRATION_STEP:
				return RegistrationFormStart
			case RegistrationSteps.REPEAT_REGISTRATION_CODE_STEP:
				return RegistrationFormRepeatCode
			case RegistrationSteps.FINISH_REGISTRATION_STEP:
				return RegistrationFormFinish
			default:
				return RegistrationFormSchoolRole
		}
	}, [registrationStep])

	return (
		<RegistrationFormWrapperComponent
			title={registrationFormTitle}
			registrationStep={registrationStep}
		>
			<RegistrationFormContent
				onChangeRegistrationStep={onChangeRegistrationStep}
			/>
		</RegistrationFormWrapperComponent>
	)
}

export default RegistrationFormWrapper
