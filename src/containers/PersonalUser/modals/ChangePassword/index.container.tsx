import React, { FC, useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import { useActions } from 'hooks/redux'
import { ChangePassModal as ChangePassModalComponent } from 'components'
import { Constants, ValidationErrorMessages } from 'types'
import { useScrollToError } from 'hooks'

interface ChangePassModalProps {
	changePasswordModalIsOpened: boolean
	onCloseChangePasswordModal: () => void
}

export interface ChangePasswordFormState {
	oldPassword: string
	newPassword: string
	confirmNewPassword: string
}

const ChangePasswordModal: FC<ChangePassModalProps> = ({
	changePasswordModalIsOpened,
	onCloseChangePasswordModal
}) => {
	const { changePassword } = useActions((state) => state.user)

	const { control, register, getValues, setValue, handleSubmit, formState } =
		useForm<ChangePasswordFormState>()

	useEffect(() => {
		register('oldPassword', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: Constants.PASSWORD_MIN_LENGTH as number,
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('newPassword', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: Constants.PASSWORD_MIN_LENGTH as number,
				message: ValidationErrorMessages.INCORRECT
			},
			validate: (value) =>
				!(getValues('confirmNewPassword') !== value) ||
				ValidationErrorMessages.PASSWORD_NOT_EQUALS
		})
		register('confirmNewPassword', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: Constants.PASSWORD_MIN_LENGTH as number,
				message: ValidationErrorMessages.INCORRECT
			},
			validate: (value) =>
				!(getValues('newPassword') !== value) ||
				ValidationErrorMessages.PASSWORD_NOT_EQUALS
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<ChangePasswordFormState>) => (value: string) => {
			setValue(name, value)
		},
		[]
	)

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit((data) => {
			changePassword({
				oldPassword: data.oldPassword,
				newPassword: data.newPassword
			})
		}),
		[]
	)

	return (
		<ChangePassModalComponent
			onSubmit={submitHandler}
			changePasswordModalIsOpen={changePasswordModalIsOpened}
			setChangePasswordModalClose={onCloseChangePasswordModal}
			onChange={changeHandler}
			errors={formState.errors}
			control={control}
		/>
	)
}

export default ChangePasswordModal
