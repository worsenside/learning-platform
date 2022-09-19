import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getQueryParams } from 'helpers'
import { saveItemToStorage } from 'helpers/storage'
import { useActions } from 'hooks/redux'
import { Loader } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'
import { StorageKeys } from 'types'
import { RegistrationSteps } from 'containers/Auth/Registration/Form/types'

import cl from '../main/style.module.scss'

const CheckRegistrationCodeLayout = () => {
	const navigate = useNavigate()
	const { checkRegistrationCode } = useActions((state) => state.registration)

	useEffect(() => {
		const { userId, registrationCode } = getQueryParams()
		if (!userId || !registrationCode) {
			return
		}
		checkRegistrationCode({
			userId: +userId,
			registrationCode: `${registrationCode}`
		})

		saveItemToStorage<RegistrationSteps>([
			StorageKeys.REGISTRATION_STEP,
			RegistrationSteps.FINISH_REGISTRATION_STEP
		])

		navigate('/registration')
	}, [])

	return (
		<div className={cl.container}>
			<Loader styleTypes={[LoaderStyles.BIG]} />
		</div>
	)
}

export default CheckRegistrationCodeLayout
