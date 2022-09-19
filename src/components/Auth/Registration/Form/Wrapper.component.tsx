import React, { FC } from 'react'

import { RegistrationSteps } from 'containers/Auth/Registration/Form/types'

import cl from 'components/Auth/Authorization/style.module.scss'

interface RegistrationFormWrapperProps {
	title: string
	registrationStep: RegistrationSteps
}

const RegistrationFormWrapper: FC<RegistrationFormWrapperProps> = ({
	title,
	registrationStep,
	children
}) => (
	<div className={cl.body}>
		<h1>{title}</h1>
		<div className={cl.stepsContainer}>
			<span>
				{registrationStep !== RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP ? (
					<>Шаг {registrationStep} из 3</>
				) : (
					<>Выберите тип пользователя</>
				)}
			</span>
		</div>
		{children}
	</div>
)

export default RegistrationFormWrapper
