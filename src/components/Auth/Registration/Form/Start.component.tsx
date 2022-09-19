import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { Button, TextInput, Link, Loader, EmailInput } from 'UI'
import { LinkStyles, LinkTextStyles } from 'UI/Link/types'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { StartRegistrationParams } from 'API/RegistrationService/types'

import cl from 'components/Auth/style.module.scss'

interface RegistrationFormStartProps {
	isLoading: boolean
	errors: FieldErrors<StartRegistrationParams>
	onSubmit: () => void
	goBack: () => void
	onChange: (
		name: FieldPath<Omit<StartRegistrationParams, 'schoolRole'>>
	) => (value: string) => void
	control: Control<StartRegistrationParams>
}

const RegistrationFormStart: FC<RegistrationFormStartProps> = ({
	isLoading,
	onSubmit,
	goBack,
	errors,
	onChange,
	control
}) => (
	<form noValidate onSubmit={onSubmit} className={cl.authForm}>
		<div className={cl.inputsContainer}>
			<TextInput
				error={errors.firstName?.message}
				placeholder="Имя"
				onChange={onChange('firstName')}
				control={control}
				name="firstName"
			/>
			<TextInput
				error={errors.lastName?.message}
				placeholder="Фамилия"
				onChange={onChange('lastName')}
				control={control}
				name="lastName"
			/>
			<EmailInput
				error={errors.email?.message}
				onChange={onChange('email')}
				control={control}
				name="email"
			/>
		</div>
		<div className={cl.buttonsContainerRegistration}>
			<Button
				type="submit"
				disabled={isLoading}
				styleTypes={[
					ButtonSizes.WIDE,
					ButtonStyles.PRIMARY,
					ButtonStyles.ROUND
				]}
			>
				{isLoading ? <Loader /> : 'Дальше'}
			</Button>
			<Button
				onClick={goBack}
				className={cl.backBtn}
				styleTypes={[ButtonSizes.WIDE]}
			>
				Вернуться назад
			</Button>
		</div>

		<div className={cl.linksContainer}>
			<div className={cl.privacyInfo}>
				<span>Нажимая на кнопку, вы подтверждаете свое согласие на</span>
				<Link
					styleTypes={[LinkTextStyles.UNDERLINE, LinkStyles.PRIMARY]}
					href="/registration"
				>
					обработку персональных данных.
				</Link>
			</div>
		</div>
	</form>
)

export default RegistrationFormStart
