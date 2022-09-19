import React, { FC, FormEvent } from 'react'
import { Control, FieldPath } from 'react-hook-form'

import { Button, TextInput } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import { UsersCoursesTable } from 'containers/Users'
import { UserViewFormState } from 'containers/Users/View'

import cl from './style.module.scss'

interface UsersViewFormProps {
	submitForm: (event: FormEvent) => void
	control: Control<UserViewFormState>
	onChange: (name: FieldPath<UserViewFormState>) => (value: any) => void
}

const UsersViewForm: FC<UsersViewFormProps> = ({
	onChange,
	submitForm,
	control
}) => (
	<form noValidate onSubmit={submitForm} className={cl.form}>
		<div className={cl.inputs}>
			<div className={cl.inputContainer}>
				<label htmlFor="firstName">Имя *</label>
				<TextInput
					id="firstName"
					onChange={onChange('firstName')}
					control={control}
					name="firstName"
					readOnly
				/>
			</div>
			<div className={cl.inputContainer}>
				<label htmlFor="lastName">Фамилия *</label>
				<TextInput
					id="lastName"
					name="lastName"
					onChange={onChange('lastName')}
					control={control}
					readOnly
				/>
			</div>
			<div className={cl.inputContainer}>
				<label htmlFor="email">Электронная почта *</label>
				<TextInput
					id="email"
					name="email"
					onChange={onChange('email')}
					control={control}
					readOnly
				/>
			</div>
			<div className={cl.inputContainer}>
				<label htmlFor="phone">Телефон *</label>
				<TextInput
					id="phone"
					name="phone"
					onChange={onChange('phone')}
					control={control}
					readOnly
				/>
			</div>
			{/* <div className={cl.courses}> */}
			{/* <label htmlFor="courses">Участие в курсах</label> */}
			{/* <Index className={cl.coursesTable} courses={courses} /> */}
			{/* </div> */}
			<div className={cl.buttonContainer}>
				<div className={cl.splitLine} />
				<Button
					styleTypes={[ButtonStyles.ROUND, ButtonStyles.DANGER]}
					type="submit"
				>
					Удалить пользователя
				</Button>
			</div>
		</div>
	</form>
)

export default UsersViewForm
