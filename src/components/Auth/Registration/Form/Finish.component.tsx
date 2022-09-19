import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { Button, Loader, PasswordInput } from 'UI'
import { PasswordPlaceholders } from 'UI/Input/types'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { FinishRegistrationForm } from 'containers/Auth/Registration/Form/Finish.container'

import cl from 'components/Auth/style.module.scss'

interface RegistrationFormPasswordProps {
	isLoading: boolean
	isValid: boolean
	errors: FieldErrors<FinishRegistrationForm>
	onSubmit: () => void
	onChange: (name: FieldPath<FinishRegistrationForm>) => (value: string) => void
	control: Control<FinishRegistrationForm>
	goBack: () => void
}

const RegistrationFormPassword: FC<RegistrationFormPasswordProps> = ({
	isLoading,
	control,
	isValid,
	errors,
	onSubmit,
	onChange,
	goBack
}) => (
	<form onSubmit={onSubmit} className={cl.passwordContainer}>
		<p className={cl.passwordInfo}>
			Пароль должен содержать не менее 8 символов.
		</p>
		<PasswordInput
			error={errors.password?.message}
			placeholder={PasswordPlaceholders.PASSWORD}
			onChange={onChange('password')}
			control={control}
			name="password"
		/>
		<PasswordInput
			error={errors.confirmPassword?.message}
			placeholder={PasswordPlaceholders.CONFIRM_PASSWORD}
			onChange={onChange('confirmPassword')}
			control={control}
			name="confirmPassword"
		/>
		<Button
			type="submit"
			disabled={isLoading}
			styleTypes={[ButtonSizes.WIDE, ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
		>
			{isLoading ? <Loader /> : 'Зарегистрироваться'}
		</Button>
		<Button
			onClick={goBack}
			className={cl.backBtn}
			styleTypes={[ButtonSizes.WIDE]}
		>
			Вернуться назад
		</Button>
	</form>
)

export default RegistrationFormPassword
