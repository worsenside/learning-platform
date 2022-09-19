import React, { useCallback, useEffect, useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'

import { ButtonStyles } from 'UI/Button/types'
import plusIconSrc from 'UI/Button/images/plus.svg'
import { Button } from 'UI'
import { AsyncThunkActionResponse, ValidationErrorMessages } from 'types'
import { useActions } from 'hooks/redux'
import { InviteUserParams } from 'API/SchoolService/types'
import { SuccessInviteModal, InviteUserModal } from 'components/Users/modals'

const InviteUser = () => {
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
	const [isInviteSuccessModalOpen, setIsInviteSuccessModalOpen] =
		useState(false)
	const [email, setEmail] = useState('')

	const { inviteUser } = useActions((state) => state.school)

	const modalInviteCloseHandler = () => {
		setIsInviteModalOpen(false)
	}
	const modalInviteOpenHandler = () => {
		setIsInviteModalOpen(true)
	}

	const modalInviteSuccessCloseHandler = () => {
		setIsInviteSuccessModalOpen(false)
	}
	const modalInviteSuccessOpenHandler = () => {
		setIsInviteSuccessModalOpen(true)
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		control
	} = useForm<InviteUserParams>()

	useEffect(() => {
		register('email', {
			required: ValidationErrorMessages.EMPTY,
			validate: {
				value: (value) => isEmail(value) || ValidationErrorMessages.INCORRECT
			}
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<InviteUserParams>) => (value: string) => {
			setValue(name, value)
		},
		[]
	)

	const submitHandler = useCallback(
		handleSubmit(async (data: InviteUserParams) => {
			const response = await inviteUser(data)
			const {
				meta: { requestStatus }
			} = response as unknown as AsyncThunkActionResponse
			if (requestStatus === 'rejected') {
				return
			}
			setEmail(data.email)
			modalInviteCloseHandler()
			modalInviteSuccessOpenHandler()
		}),
		[handleSubmit]
	)
	return (
		<>
			<Button
				onClick={modalInviteOpenHandler}
				styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
			>
				<img src={plusIconSrc} alt="plus" />
				Добавить пользователя
			</Button>
			<InviteUserModal
				onChange={changeHandler}
				isOpen={isInviteModalOpen}
				errors={errors}
				onClose={modalInviteCloseHandler}
				onSubmit={submitHandler}
				control={control}
			/>
			<SuccessInviteModal
				email={email}
				openInviteModal={modalInviteOpenHandler}
				onClose={modalInviteSuccessCloseHandler}
				isOpen={isInviteSuccessModalOpen}
			/>
		</>
	)
}

export default InviteUser
