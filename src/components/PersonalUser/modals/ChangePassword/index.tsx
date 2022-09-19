import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import Modal from 'UI/Modal'
import { ModalSize } from 'UI/Modal/types'
import { Button, PasswordInput } from 'UI'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { ChangePasswordFormState } from 'containers/PersonalUser/modals/ChangePassword/index.container'

import cl from '../style.module.scss'

interface ChangePasswordModalProps {
	changePasswordModalIsOpen: boolean
	errors: FieldErrors<ChangePasswordFormState>
	setChangePasswordModalClose: () => void
	onSubmit: () => void
	control: Control<ChangePasswordFormState>
	onChange: (
		name: FieldPath<ChangePasswordFormState>
	) => (value: string) => void
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
	changePasswordModalIsOpen,
	setChangePasswordModalClose,
	onSubmit,
	errors,
	control,
	onChange
}) => (
	<Modal
		title="Смена пароля"
		styleTypes={[ModalSize.BIG]}
		isOpen={changePasswordModalIsOpen}
		onClose={setChangePasswordModalClose}
	>
		<form onSubmit={onSubmit} noValidate className={cl.modalForm}>
			<div className={cl.inputContainer}>
				<label htmlFor="oldPassword">Старый пароль</label>
				<PasswordInput
					name="oldPassword"
					onChange={onChange('oldPassword')}
					control={control}
					error={errors.oldPassword?.message}
					id="oldPassword"
				/>
			</div>
			<div className={cl.inputDescription}>
				<label htmlFor="newPassword">Новый пароль</label>
				<div className={cl.inputContainer}>
					<p>Придумайте пароль, содержащий не менее 8 символов</p>
					<PasswordInput
						name="newPassword"
						id="newPassword"
						onChange={onChange('newPassword')}
						error={errors.newPassword?.message}
						control={control}
					/>
				</div>
			</div>
			<div className={cl.inputContainer}>
				<label htmlFor="confirmNewPassword">Повторите новый пароль</label>
				<PasswordInput
					name="confirmNewPassword"
					onChange={onChange('confirmNewPassword')}
					error={errors.confirmNewPassword?.message}
					control={control}
					id="confirmNewPassword"
				/>
			</div>
			<div className={cl.modalSplitLine} />
			<div className={cl.buttonsContainer}>
				<Button
					onClick={setChangePasswordModalClose}
					styleTypes={[
						ButtonSizes.WIDE,
						ButtonStyles.DECLINE_PRIMARY,
						ButtonStyles.ROUND
					]}
				>
					Отмена
				</Button>
				<Button
					type="submit"
					styleTypes={[
						ButtonSizes.WIDE,
						ButtonStyles.PRIMARY,
						ButtonStyles.ROUND
					]}
				>
					Сохранить
				</Button>
			</div>
		</form>
	</Modal>
)

export default ChangePasswordModal
