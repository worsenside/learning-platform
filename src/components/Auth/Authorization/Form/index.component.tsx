import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Button, Link, Loader, EmailInput, PasswordInput } from 'UI'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { PasswordPlaceholders } from 'UI/Input/types'
import { AuthorizeParams } from 'API/AuthorizationService/types'

import cl from '../style.module.scss'

interface AuthorizationFormProps {
	isLoading: boolean
	errors: FieldErrors<AuthorizeParams>
	onSubmit: () => void
	onChange: (name: FieldPath<AuthorizeParams>) => (value: string) => void
	control: Control<AuthorizeParams>
}

const AuthorizationForm: FC<AuthorizationFormProps> = ({
	errors,
	isLoading,
	onSubmit,
	onChange,
	control
}) => (
	<>
		<form noValidate onSubmit={onSubmit} className={cl.authForm}>
			<div className={cl.inputsContainer}>
				<EmailInput
					error={errors.email?.message}
					onChange={onChange('email')}
					control={control}
					name="email"
				/>
				<PasswordInput
					error={errors.password?.message}
					onChange={onChange('password')}
					placeholder={PasswordPlaceholders.PASSWORD}
					control={control}
					name="password"
				/>
			</div>
			<div className={cl.buttonsContainerAuthorization}>
				<Link href="/password-recovery">Не помню пароль</Link>
				<Button
					type="submit"
					disabled={isLoading}
					styleTypes={[
						ButtonSizes.WIDE,
						ButtonStyles.PRIMARY,
						ButtonStyles.ROUND
					]}
				>
					{isLoading ? <Loader /> : 'Войти'}
				</Button>
			</div>
		</form>
		<DevTool control={control} />
	</>
)

export default AuthorizationForm
