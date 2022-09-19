import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useActions } from 'hooks/redux'
import { getQueryParams } from 'helpers'
import { saveItemToStorage } from 'helpers/storage'
import { Loader } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'
import { StorageKeys } from 'types'
import { PasswordRecoverySteps } from 'containers/Auth/PasswordRecovery/Form/types'

import cl from '../main/style.module.scss'

const CheckPasswordRecoveryCodeLayout = () => {
	const navigate = useNavigate()
	const { checkPasswordRecoveryCode } = useActions(
		(state) => state.passwordRecovery
	)

	useEffect(() => {
		const { userId, passwordRecoveryCode } = getQueryParams()
		if (!userId || !passwordRecoveryCode) {
			return
		}
		checkPasswordRecoveryCode({
			userId: +userId,
			passwordRecoveryCode: `${passwordRecoveryCode}`
		})
		saveItemToStorage([
			StorageKeys.PASSWORD_RECOVERY_STEP,
			PasswordRecoverySteps.FINISH_STEP
		])

		navigate('/password-recovery')
	}, [])

	return (
		<div className={cl.container}>
			<Loader styleTypes={[LoaderStyles.BIG]} />
		</div>
	)
}

export default CheckPasswordRecoveryCodeLayout
