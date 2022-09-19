import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { Button, Loader, PasswordInput } from 'UI'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { PasswordPlaceholders } from 'UI/Input/types'
import { FinishPasswordRecoveryForm } from 'containers/Auth/PasswordRecovery/Form/Finish.container'

import cl from 'components/Auth/style.module.scss'

interface PasswordRecoveryFormFinishProps {
	isLoading: boolean
	errors: FieldErrors<FinishPasswordRecoveryForm>
	onSubmit: () => void
	goBack: () => void
	onChange: (
		name: FieldPath<FinishPasswordRecoveryForm>
	) => (value: string) => void
	control: Control<FinishPasswordRecoveryForm>
}

const PasswordRecoveryFormFinish: FC<PasswordRecoveryFormFinishProps> = ({
	errors,
	isLoading,
	onSubmit,
	onChange,
	goBack,
	control
}) => (
	<form noValidate onSubmit={onSubmit} className={cl.passwordContainer}>
		<PasswordInput
			error={errors.password?.message}
			onChange={onChange('password')}
			control={control}
			name="password"
			placeholder={PasswordPlaceholders.PASSWORD}
		/>
		<PasswordInput
			error={errors.confirmPassword?.message}
			onChange={onChange('confirmPassword')}
			control={control}
			name="confirmPassword"
			placeholder={PasswordPlaceholders.CONFIRM_PASSWORD}
		/>
		<Button
			type="submit"
			disabled={isLoading}
			styleTypes={[ButtonSizes.WIDE, ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
		>
			{isLoading ? <Loader /> : 'Сохранить изменения'}
		</Button>
		<Button onClick={goBack} styleTypes={[ButtonSizes.WIDE]}>
			Вернуться назад
		</Button>
	</form>
)

export default PasswordRecoveryFormFinish
