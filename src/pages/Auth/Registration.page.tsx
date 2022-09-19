import React, { FC, useCallback, useState } from 'react'

import { saveItemToStorage, getItemFromStorage } from 'helpers/storage'

import { Link } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import { StorageKeys } from 'types'
import RegistrationFormWrapper from 'containers/Auth/Registration/Form/Wrapper.container'
import { RegistrationSteps } from 'containers/Auth/Registration/Form/types'

import cl from './style.module.scss'

const RegistrationPage: FC = () => {
	const [registrationStep, setRegistrationStep] = useState<RegistrationSteps>(
		+getItemFromStorage(
			StorageKeys.REGISTRATION_STEP,
			RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP
		)
	)

	const changeRegistrationStepHandler = useCallback(
		(step: RegistrationSteps) => {
			saveItemToStorage([StorageKeys.REGISTRATION_STEP, step])
			setRegistrationStep(step)
		},
		[]
	)

	return (
		<div className={cl.authRegistration}>
			<RegistrationFormWrapper
				registrationStep={registrationStep}
				onChangeRegistrationStep={changeRegistrationStepHandler}
			/>
			<div className={cl.footer}>
				{(registrationStep === RegistrationSteps.START_REGISTRATION_STEP ||
					registrationStep === RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP) && (
					<div>
						<span>У меня уже есть аккаунт.</span>
						<Link
							onClick={() =>
								changeRegistrationStepHandler(
									RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP
								)
							}
							styleTypes={[LinkStyles.PRIMARY]}
							href="/"
						>
							Войти
						</Link>
					</div>
				)}
				<p>© 2021 Учебная платформа. Все права защищены</p>
			</div>
		</div>
	)
}

export default RegistrationPage
