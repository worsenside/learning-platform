import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { Button, Link, Loader, EmailInput } from 'UI'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { LinkSizes, LinkStyles, LinkTextStyles } from 'UI/Link/types'
import { StartPasswordRecoveryParams } from 'API/PasswordRecoveryService/types'

import cl from 'components/Auth/style.module.scss'

interface PasswordRecoveryFormStartProps {
	isLoading: boolean
	errors: FieldErrors<StartPasswordRecoveryParams>
	onSubmit: () => void
	goBack: () => void
	onChange: (
		name: FieldPath<StartPasswordRecoveryParams>
	) => (value: string) => void
	control: Control<StartPasswordRecoveryParams>
}

const PasswordRecoveryFormStart: FC<PasswordRecoveryFormStartProps> = ({
	errors,
	onSubmit,
	isLoading,
	goBack,
	onChange,
	control
}) => (
	<form noValidate onSubmit={onSubmit} className={cl.authForm}>
		<div className={cl.inputsContainer}>
			<EmailInput
				error={errors.email?.message}
				onChange={onChange('email')}
				control={control}
				name="email"
			/>
		</div>
		<div className={cl.buttonsContainerRecovery}>
			<Button
				type="submit"
				disabled={isLoading}
				styleTypes={[
					ButtonSizes.WIDE,
					ButtonStyles.PRIMARY,
					ButtonStyles.ROUND
				]}
			>
				{isLoading ? <Loader /> : 'Отправить'}
			</Button>
			<Link
				onClick={goBack}
				styleTypes={[
					LinkStyles.SECONDARY,
					LinkSizes.WIDE,
					LinkTextStyles.CENTERED,
					LinkTextStyles.MEDIUM
				]}
				href="/"
			>
				Вернуться назад
			</Link>
		</div>
	</form>
)
export default PasswordRecoveryFormStart
