import { InputHTMLAttributes } from 'react'
import { Control } from 'react-hook-form'

import { ValidateNotifyProps } from './ValidateNotify'

export interface TextInputProps
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			'value' | 'onChange' | 'name'
		>,
		ValidateNotifyProps {
	onChange: (value: string) => void
	control: Control<any>
	name: string
	styleTypes?: InputValidate[]
}

export enum InputValidate {
	ERROR = 'ValidateError'
}

export enum PasswordPlaceholders {
	PASSWORD = 'Пароль',
	CONFIRM_PASSWORD = 'Повторите пароль'
}
