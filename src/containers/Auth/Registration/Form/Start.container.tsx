import React, { FC, useCallback, useEffect } from 'react'
import isEmail from 'validator/lib/isEmail'
import { FieldPath, useForm } from 'react-hook-form'

import { removeItemFromStorage } from 'helpers/storage'
import { useActions, useAppSelector } from 'hooks/redux'

import {
	StorageKeys,
	ValidationErrorMessages,
	AsyncThunkActionResponse
} from 'types'
import RegistrationFormStartComponent from 'components/Auth/Registration/Form/Start.component'
import { StartRegistrationParams } from 'API/RegistrationService/types'
import { useScrollToError } from 'hooks'
import { RegistrationFormBaseProps, RegistrationSteps } from './types'

interface RegistrationFormStartProps extends RegistrationFormBaseProps {}

const RegistrationFormStart: FC<RegistrationFormStartProps> = ({
	onChangeRegistrationStep
}) => {
	const goBackHandler = useCallback(() => {
		removeItemFromStorage([StorageKeys.REGISTRATION_DATA])
		onChangeRegistrationStep(RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP)
	}, [])

	const { meta, schoolRole } = useAppSelector((state) => state.registration)
	const { startRegistration } = useActions((state) => state.registration)
	const { register, formState, handleSubmit, setValue, control } =
		useForm<StartRegistrationParams>()

	useEffect(() => {
		if (!schoolRole) {
			return goBackHandler()
		}

		setValue('schoolRole', schoolRole)
		register('firstName', {
			required: ValidationErrorMessages.EMPTY,
			minLength: { value: 3, message: ValidationErrorMessages.INCORRECT }
		})
		register('lastName', {
			required: ValidationErrorMessages.EMPTY,
			minLength: { value: 3, message: ValidationErrorMessages.INCORRECT }
		})
		register('email', {
			required: ValidationErrorMessages.EMPTY,
			validate: (value) => isEmail(value) || ValidationErrorMessages.INCORRECT
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<Omit<StartRegistrationParams, 'schoolRole'>>) =>
			(value: string) => {
				setValue(name, value)
			},
		[]
	)

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit(async (data: StartRegistrationParams) => {
			const response = await startRegistration(data)
			const {
				meta: { requestStatus }
			} = response as unknown as AsyncThunkActionResponse

			if (requestStatus === 'rejected') {
				return
			}
			onChangeRegistrationStep(RegistrationSteps.REPEAT_REGISTRATION_CODE_STEP)
		}),
		[handleSubmit]
	)

	return (
		<RegistrationFormStartComponent
			goBack={goBackHandler}
			onSubmit={submitHandler}
			errors={formState.errors}
			isLoading={meta.isLoading}
			onChange={changeHandler}
			control={control}
		/>
	)
}

export default RegistrationFormStart
