import React, { FC, FormEvent } from 'react'
import {
	Control,
	FieldErrors,
	FieldPath,
	UseFormGetValues
} from 'react-hook-form'

import {
	Button,
	DateSelect,
	TextInput,
	TextArea,
	DragAndDrop,
	EmailInput,
	PhoneInput
} from 'UI'
import { AcceptTypes, SizeTypes } from 'UI/DragAndDrop/types'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import ChangePasswordModalContainer from 'containers/PersonalUser/modals/ChangePassword/index.container'
import { UserProfileFormState } from 'containers/PersonalUser/Profile/Form.container'

import cl from './style.module.scss'

interface UserProfileFormProps {
	errors: FieldErrors<UserProfileFormState>
	onChange: (name: FieldPath<UserProfileFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	onOpenChangePasswordModal: () => void
	onCloseChangePasswordModal: () => void
	changePasswordModalIsOpened: boolean
	getValues: UseFormGetValues<UserProfileFormState>
	control: Control<UserProfileFormState>
}

const UserProfileForm: FC<UserProfileFormProps> = ({
	errors,
	onOpenChangePasswordModal,
	onCloseChangePasswordModal,
	changePasswordModalIsOpened,
	onChange,
	onSubmit,
	getValues,
	control
}) => (
	<>
		<form className={cl.form} noValidate onSubmit={onSubmit}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="drag-image">Ваша фотография</label>
					<DragAndDrop
						id="drag-image"
						control={control}
						name="avatar"
						previewUrl={getValues('avatarUrl')}
						onChange={onChange('avatar')}
						size={[12, SizeTypes.MB]}
						accept={[AcceptTypes.JPG, AcceptTypes.JPEG, AcceptTypes.PNG]}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="firstName">Имя *</label>
					<TextInput
						id="firstName"
						name="firstName"
						error={errors.firstName?.message}
						onChange={onChange('firstName')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="lastName">Фамилия *</label>
					<TextInput
						id="lastName"
						name="lastName"
						error={errors.lastName?.message}
						onChange={onChange('lastName')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label>Дата рождения</label>
					<DateSelect
						name="birthDate"
						control={control}
						onChange={onChange('birthDate')}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="city">Город</label>
					<TextInput
						id="city"
						name="city"
						error={errors.city?.message}
						onChange={onChange('city')}
						control={control}
						placeholder="Город, в котором вы проживаете"
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="aboutMe">О себе</label>
					<TextArea
						id="aboutMe"
						name="aboutMe"
						error={errors.aboutMe?.message}
						placeholder="Расскажите о себе, своем опыте, увлечениях"
						onChange={onChange('aboutMe')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="email">Электронная почта *</label>
					<EmailInput
						id="email"
						name="email"
						error={errors.email?.message}
						placeholder="name@domen.ru"
						onChange={onChange('email')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="phone">Телефон *</label>
					<PhoneInput
						id="phone"
						name="phone"
						error={errors.phone?.message}
						onChange={onChange('phone')}
						control={control}
					/>
				</div>
				<div className={cl.passwordContainer}>
					<label>Пароль</label>
					<Button
						styleTypes={[
							ButtonStyles.OUTLINE_DARK,
							ButtonStyles.ROUND,
							ButtonSizes.SMALL
						]}
						onClick={onOpenChangePasswordModal}
					>
						Сменить пароль
					</Button>
				</div>

				<div className={cl.splitLine} />
			</div>
			<div className={cl.buttonsContainer}>
				<Button styleTypes={[ButtonStyles.ROUND, ButtonStyles.OUTLINE_PRIMARY]}>
					Отменить изменения
				</Button>
				<Button
					type="submit"
					styleTypes={[ButtonStyles.ROUND, ButtonStyles.PRIMARY]}
				>
					Сохранить изменения
				</Button>
			</div>
		</form>
		<ChangePasswordModalContainer
			onCloseChangePasswordModal={onCloseChangePasswordModal}
			changePasswordModalIsOpened={changePasswordModalIsOpened}
		/>
	</>
)
export default UserProfileForm
