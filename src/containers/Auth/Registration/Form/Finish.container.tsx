import React, { FC, useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useActions, useAppSelector } from 'hooks/redux'
import RegistrationFormFinishComponent from 'components/Auth/Registration/Form/Finish.component'
import {
	RegistrationFormBaseProps,
	RegistrationSteps
} from 'containers/Auth/Registration/Form/types'
import { FinishRegistrationParams } from 'API/RegistrationService/types'
import { Constants, ValidationErrorMessages } from 'types'
import { useScrollToError } from 'hooks'

interface RegistrationFormFinishProps extends RegistrationFormBaseProps {}

export interface FinishRegistrationForm
	extends Omit<FinishRegistrationParams, 'registrationCode' | 'userId'> {
	confirmPassword: string
}

const RegistrationFormFinish: FC<RegistrationFormFinishProps> = ({
	onChangeRegistrationStep
}) => {
	const navigate = useNavigate()
	const { finishRegistration, breakRegistration } = useActions(
		(state) => state.registration
	)
	const { meta } = useAppSelector((state) => state.registration)
	const { userId, registrationCode, email } = useAppSelector(
		(state) => state.registration
	)
	const { register, formState, handleSubmit, setValue, getValues, control } =
		useForm<FinishRegistrationForm>()

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
		(name: FieldPath<FinishRegistrationForm>) => (value: string) => {
			setValue(name, value)
		},
		[]
	)

	const goBackHandler = useCallback(() => {
		breakRegistration({ email })
		onChangeRegistrationStep(RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP)
	}, [])

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit((data: FinishRegistrationForm) => {
			if (!userId || !registrationCode) {
				return
			}
			finishRegistration({
				userId,
				registrationCode,
				password: data.password
			})
			navigate('/course/list')
		}),
		[handleSubmit, userId, registrationCode]
	)

	return (
		<RegistrationFormFinishComponent
			goBack={goBackHandler}
			errors={formState.errors}
			isLoading={meta.isLoading}
			onSubmit={submitHandler}
			control={control}
			onChange={changeHandler}
			isValid={formState.isValid}
		/>
	)
}

export default RegistrationFormFinish
