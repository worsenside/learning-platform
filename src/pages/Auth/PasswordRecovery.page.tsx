import React, { FC, useCallback, useEffect, useState } from 'react'

import { getItemFromStorage, saveItemToStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import PasswordRecoveryWrapper from 'containers/Auth/PasswordRecovery/Form/Wrapper.container'
import { PasswordRecoverySteps } from 'containers/Auth/PasswordRecovery/Form/types'

import cl from './style.module.scss'

const PasswordRecoveryPage: FC = () => {
	const [passwordRecoveryStep, setPasswordRecoveryStep] =
		useState<PasswordRecoverySteps>(
			getItemFromStorage(
				StorageKeys.PASSWORD_RECOVERY_STEP,
				PasswordRecoverySteps.START_STEP
			)
		)
	useEffect(() => {
		console.log(passwordRecoveryStep)
	}, [passwordRecoveryStep])
	const changePasswordRecoveryStepHandler = useCallback(
		(step: PasswordRecoverySteps) => {
			saveItemToStorage([StorageKeys.PASSWORD_RECOVERY_STEP, step])
			setPasswordRecoveryStep(step)
		},
		[]
	)

	return (
		<div className={cl.auth}>
			<PasswordRecoveryWrapper
				onChangePasswordRecoveryStep={changePasswordRecoveryStepHandler}
				passwordRecoveryStep={passwordRecoveryStep}
			/>
			<div className={cl.footer}>
				<p>© 2021 Учебная платформа. Все права защищены</p>
			</div>
		</div>
	)
}

export default PasswordRecoveryPage
