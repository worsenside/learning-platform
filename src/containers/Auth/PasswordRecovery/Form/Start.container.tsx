import React, { FC, useCallback, useEffect } from 'react'
import isEmail from 'validator/lib/isEmail'
import { FieldPath, useForm } from 'react-hook-form'

import { useActions, useAppSelector } from 'hooks/redux'
import { removeItemFromStorage } from 'helpers/storage'

import PasswordRecoveryFormStartComponent from 'components/Auth/PasswordRecovery/Form/Start.component'
import {
	AsyncThunkActionResponse,
	StorageKeys,
	ValidationErrorMessages
} from 'types'
import { StartPasswordRecoveryParams } from 'API/PasswordRecoveryService/types'
import { useScrollToError } from 'hooks'
import { PasswordRecoveryFormBaseProps, PasswordRecoverySteps } from './types'

interface PasswordRecoveryFormStartProps
	extends PasswordRecoveryFormBaseProps {}

const PasswordRecoveryFormStart: FC<PasswordRecoveryFormStartProps> = ({
	onChangePasswordRecoveryStep
}) => {
	const { register, formState, handleSubmit, setValue, control } =
		useForm<StartPasswordRecoveryParams>()

	const { startPasswordRecovery } = useActions(
		(state) => state.passwordRecovery
	)
	const { meta } = useAppSelector((state) => state.passwordRecovery)

	useEffect(() => {
		register('email', {
			required: ValidationErrorMessages.EMPTY,
			validate: {
				value: (value) => isEmail(value) || ValidationErrorMessages.INCORRECT
			}
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<StartPasswordRecoveryParams>) => (value: string) => {
			setValue(name, value)
		},
		[]
	)

	const goBackHandler = useCallback(() => {
		removeItemFromStorage([StorageKeys.PASSWORD_RECOVERY_STEP])
		removeItemFromStorage([StorageKeys.PASSWORD_RECOVERY_DATA])
	}, [])

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit(async (data: StartPasswordRecoveryParams) => {
			const response = await startPasswordRecovery(data)
			const {
				meta: { requestStatus }
			} = response as unknown as AsyncThunkActionResponse
			if (requestStatus === 'rejected') {
				return
			}
			onChangePasswordRecoveryStep(
				PasswordRecoverySteps.REPEAT_PASSWORD_RECOVERY_CODE_STEP
			)
		}),
		[handleSubmit]
	)

	return (
		<PasswordRecoveryFormStartComponent
			onSubmit={submitHandler}
			onChange={changeHandler}
			errors={formState.errors}
			isLoading={meta.isLoading}
			goBack={goBackHandler}
			control={control}
		/>
	)
}

export default PasswordRecoveryFormStart
