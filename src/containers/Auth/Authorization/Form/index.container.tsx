import React, { FC, useCallback, useEffect } from 'react'
import isEmail from 'validator/lib/isEmail'
import { useForm, FieldPath } from 'react-hook-form'

import { useActions, useAppSelector } from 'hooks/redux'

import { AuthorizeParams } from 'API/AuthorizationService/types'
import AuthorizationFormComponent from 'components/Auth/Authorization/Form/index.component'
import { ValidationErrorMessages } from 'types'
import { useScrollToError } from 'hooks'

const AuthorizationForm: FC = () => {
	const { authorize } = useActions((state) => state.authorization)
	const { meta } = useAppSelector((state) => state.authorization)

	const { register, formState, handleSubmit, setValue, control } =
		useForm<AuthorizeParams>()

	useEffect(() => {
		register('email', {
			required: ValidationErrorMessages.EMPTY,
			validate: (value) => isEmail(value) || ValidationErrorMessages.INCORRECT
		})
		register('password', {
			required: ValidationErrorMessages.EMPTY,
			minLength: { value: 8, message: ValidationErrorMessages.INCORRECT }
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<AuthorizeParams>) => (value: string) => {
			setValue(name, value)
		},
		[]
	)

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit((data) => {
			authorize(data)
		}),
		[]
	)

	return (
		<AuthorizationFormComponent
			onSubmit={submitHandler}
			onChange={changeHandler}
			control={control}
			errors={formState.errors}
			isLoading={meta.isLoading}
		/>
	)
}

export default AuthorizationForm
