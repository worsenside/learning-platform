import React, { useCallback, useEffect, useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import isEmail from 'validator/lib/isURL'

import UserProfileFormComponent from 'components/PersonalUser/Profile/Form.component'
import { PatternsType, ResponseWithError, ValidationErrorMessages } from 'types'
import { IMainUserInfo } from 'types/models/user.model'
import { userQuery } from 'store/queries'
import { Loader } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'
import { getFormData, getPatterns } from 'helpers'
import { useActions, useAppSelector } from 'hooks/redux'
import { SuccessChangeInfoModal } from 'components/PersonalUser/modals'
import { useScrollToError } from 'hooks'

export interface UserProfileFormState extends IMainUserInfo {
	avatar?: File
	avatarUrl?: string
}

const UserProfileForm = () => {
	const [successChangeInfoModalIsOpen, setChangeInfoModalIsOpen] =
		useState(false)

	const [updateYourself] = userQuery.useUpdateYourselfMutation()

	const { token } = useAppSelector((state) => state.system)
	const { pushError } = useActions((state) => state.system)
	const { isLoading, data: userData } = userQuery.useGetYourselfQuery(token)
	const [changePasswordModalIsOpened, setChangePasswordModalIsOpened] =
		useState(false)

	const openChangePasswordModalHandler = useCallback(
		setChangePasswordModalIsOpened.bind(null, true),
		[]
	)
	const closeChangePasswordModalHandler = useCallback(
		setChangePasswordModalIsOpened.bind(null, false),
		[]
	)

	const closeModalHandler = () => {
		setChangeInfoModalIsOpen(false)
	}

	const { register, control, getValues, formState, setValue, handleSubmit } =
		useForm<UserProfileFormState>()
	useEffect(() => {
		register('firstName', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('lastName', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('email', {
			required: ValidationErrorMessages.EMPTY,
			validate: {
				value: (value) => isEmail(value) || ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('phone', {
			required: ValidationErrorMessages.EMPTY,
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('city', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('aboutMe', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
	}, [])
	useEffect(() => {
		const user = userData?.data
		if (!user) {
			return
		}
		setValue('firstName', user.firstName.trim())
		setValue('avatarUrl', user.avatarUrl)
		setValue('lastName', user.lastName.trim())
		setValue('email', user.email.trim())
		setValue('phone', user.phone.trim())
		setValue('city', user.city.trim())
		setValue('birthDate', user.birthDate || undefined)
		setValue('aboutMe', user.aboutMe.trim())
	}, [userData])

	const changeHandler = useCallback(
		(name: FieldPath<UserProfileFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit(async (data) => {
			const response = await updateYourself(await getFormData(data))
			const { error } = response as unknown as ResponseWithError
			if (error) {
				pushError(error.data)
				return
			}

			setChangeInfoModalIsOpen(true)
		}),
		[handleSubmit]
	)

	if (isLoading) {
		return <Loader styleTypes={[LoaderStyles.BIG]} />
	}

	return (
		<>
			<UserProfileFormComponent
				control={control}
				onChange={changeHandler}
				errors={formState.errors}
				getValues={getValues}
				onSubmit={submitHandler}
				changePasswordModalIsOpened={changePasswordModalIsOpened}
				onCloseChangePasswordModal={closeChangePasswordModalHandler}
				onOpenChangePasswordModal={openChangePasswordModalHandler}
			/>
			<SuccessChangeInfoModal
				isOpen={successChangeInfoModalIsOpen}
				onClose={closeModalHandler}
			/>
		</>
	)
}

export default UserProfileForm
