import React, { FC } from 'react'

import TextInput from './TextInput'
import { TextInputProps } from './types'

interface PhoneInputProps extends TextInputProps {
	phoneMask?: boolean
}

const PhoneInput: FC<PhoneInputProps> = ({
	error,
	onChange,
	...defaultProps
}) => {
	const parsePhone = (value: string) => {
		if (!value) return ''

		const phoneNumber = value.replace(/[^\d]/g, '')

		if (phoneNumber.length < 5)
			return `${phoneNumber.slice(0, 1)}${phoneNumber.slice(1)}`
		if (phoneNumber.length < 8) {
			return `${phoneNumber.slice(0, 1)} (${phoneNumber.slice(
				1,
				4
			)}) ${phoneNumber.slice(4)}`
		}
		return `${phoneNumber.slice(0, 1)} (${phoneNumber.slice(
			1,
			4
		)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`
	}
	// TODO ПЕРЕПИСАТЬ МАСКУ

	const changeHandler = (value: string) => {
		const parsedPhone = parsePhone(value)

		onChange(parsedPhone)
	}

	// TODO Проверить работу и исправить
	return (
		<TextInput
			placeholder="8 (999)-999-9999"
			error={error}
			{...defaultProps}
			onChange={changeHandler}
		/>
	)
}

export default PhoneInput
