import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { Button, Modal, EmailInput } from 'UI'
import { ModalSize } from 'UI/Modal/types'
import { ButtonStyles } from 'UI/Button/types'
import { InviteUserParams } from 'API/SchoolService/types'
import cl from './style.module.scss'

interface UserInviteProps {
	errors: FieldErrors<InviteUserParams>
	onSubmit: () => void
	onChange: (name: FieldPath<InviteUserParams>) => (value: string) => void
	control: Control<InviteUserParams>
	isOpen: boolean
	onClose: () => void
}

const InviteUser: FC<UserInviteProps> = ({
	control,
	onChange,
	errors,
	onSubmit,
	isOpen,
	onClose
}) => (
	<Modal
		styleTypes={[ModalSize.SMALL]}
		onClose={onClose}
		isOpen={isOpen}
		title="Пригласить сотрудника"
	>
		<form noValidate onSubmit={onSubmit}>
			<p className={cl.description}>
				Чтобы отправить приглашение сотруднику, введите его электронную почту.
			</p>
			<div className={cl.inputContainer}>
				<label htmlFor="email">Электронная почта</label>
				<EmailInput
					name="email"
					error={errors.email?.message}
					onChange={onChange('email')}
					control={control}
					placeholder="name@domen.ru"
					id="email"
				/>
			</div>
			<div className={cl.buttonsContainer}>
				<Button
					onClick={onClose}
					styleTypes={[ButtonStyles.DECLINE_PRIMARY, ButtonStyles.ROUND]}
				>
					Отмена
				</Button>
				<Button
					type="submit"
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					Отправить приглашение
				</Button>
			</div>
		</form>
	</Modal>
)

export default InviteUser
