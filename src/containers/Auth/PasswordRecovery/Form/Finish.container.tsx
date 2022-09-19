import React, { FC, useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { removeItemFromStorage } from 'helpers/storage'
import { useActions, useAppSelector } from 'hooks/redux'
import PasswordRecoveryFormFinishComponent from 'components/Auth/PasswordRecovery/Form/Finish.component'
import { Constants, StorageKeys, ValidationErrorMessages } from 'types'
import { FinishPasswordRecoveryParams } from 'API/PasswordRecoveryService/types'
import { useScrollToError } from 'hooks'
import { PasswordRecoveryFormBaseProps, PasswordRecoverySteps } from './types'

export interface FinishPasswordRecoveryForm
	extends Omit<
		FinishPasswordRecoveryParams,
		'passwordRecoveryCode' | 'userId'
	> {
	confirmPassword: string
}

interface PasswordRecoveryFormFinishProps
	extends PasswordRecoveryFormBaseProps {}

const PasswordRecoveryFormFinish: FC<PasswordRecoveryFormFinishProps> = ({
	onChangePasswordRecoveryStep
}) => {
	const navigate = useNavigate()
	const { finishPasswordRecovery } = useActions(
		(state) => state.passwordRecovery
	)
	const { meta, userId, passwordRecoveryCode } = useAppSelector(
		(state) => state.passwordRecovery
	)

	const { register, formState, getValues, setValue, handleSubmit, control } =
		useForm<FinishPasswordRecoveryForm>()

	useEffect(() => {
		register('password', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: Constants.PASSWORD_MIN_LENGTH as number,
				message: ValidationErrorMessages.INCORRECT
			},
			validate: (value) =>
				!(getValues('confirmPassword') !== value) ||
				ValidationErrorMessages.PASSWORD_NOT_EQUALS
		})
		register('confirmPassword', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: Constants.PASSWORD_MIN_LENGTH as number,
				message: ValidationErrorMessages.INCORRECT
			},
			validate: (value) =>
				!(getValues('password') !== value) ||
				ValidationErrorMessages.PASSWORD_NOT_EQUALS
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<FinishPasswordRecoveryForm>) => (value: string) => {
			setValue(name, value)
		},
		[]
	)

	const goBackHandler = useCallback(() => {
		removeItemFromStorage([
			StorageKeys.PASSWORD_RECOVERY_DATA,
			StorageKeys.PASSWORD_RECOVERY_STEP
		])
		onChangePasswordRecoveryStep(PasswordRecoverySteps.START_STEP)
	}, [])

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit((data: FinishPasswordRecoveryForm) => {
			if (!passwordRecoveryCode || !userId) {
				return
			}
			finishPasswordRecovery({
				password: data.password,
				passwordRecoveryCode,
				userId
			})
			navigate('/')
		}),
		[handleSubmit, passwordRecoveryCode, userId]
	)

	return (
		<PasswordRecoveryFormFinishComponent
			onSubmit={submitHandler}
			errors={formState.errors}
			goBack={goBackHandler}
			onChange={changeHandler}
			isLoading={meta.isLoading}
			control={control}
		/>
	)
}

export default PasswordRecoveryFormFinish
