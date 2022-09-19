import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldPath, useForm } from 'react-hook-form'

import { UsersViewForm as UsersViewFormComponent } from 'components'
import { schoolQuery } from 'store/queries'
import { IUser } from 'types/models/user.model'
import { ConfirmDeleteUserModal } from 'components/Users/modals'

export interface UserViewFormState
	extends Pick<IUser, 'id' | 'firstName' | 'lastName' | 'email' | 'phone'> {}

interface UsersViewFormProps extends UserViewFormState {}

const UsersViewForm: FC<UsersViewFormProps> = ({
	firstName,
	lastName,
	email,
	phone,
	id
}) => {
	const navigate = useNavigate()

	const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
		useState(false)
	const [currentDeletedUserId, setCurrentDeletedUserId] = useState<number>()
	const { control, setValue } = useForm<UserViewFormState>()

	useEffect(() => {
		setValue('firstName', firstName.trim())
		setValue('lastName', lastName.trim())
		setValue('email', email.trim())
		setValue('phone', phone.trim())
	}, [firstName, lastName, email, phone])

	const closeHandler = () => {
		setConfirmDeleteModalIsOpen(false)
	}

	const [deleteUserFromSchool] = schoolQuery.useDeleteUserFromSchoolMutation()

	const clickDeleteHandler = useCallback(() => {
		if (!currentDeletedUserId) {
			return
		}
		deleteUserFromSchool(currentDeletedUserId)
		setConfirmDeleteModalIsOpen(false)
		navigate('/user/list')
	}, [currentDeletedUserId])

	const changeHandler = useCallback(
		(name: FieldPath<UserViewFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault()
		setConfirmDeleteModalIsOpen(true)
		setCurrentDeletedUserId(id)
	}
	return (
		<>
			<UsersViewFormComponent
				control={control}
				onChange={changeHandler}
				submitForm={submitHandler}
			/>
			<ConfirmDeleteUserModal
				isOpen={confirmDeleteModalIsOpen}
				userName={`${firstName} ${lastName}`}
				onClose={closeHandler}
				onDelete={clickDeleteHandler}
			/>
		</>
	)
}

export default UsersViewForm
