import React, { FC, useState } from 'react'

import TextInput from './TextInput'
import { TextInputProps } from './types'

interface PasswordInputProps extends TextInputProps {}

const PasswordInput: FC<PasswordInputProps> = (props) => {
	const [type, setType] = useState<'text' | 'password'>('password')
	const togglePassShownHandler = setType.bind(null, (prev) =>
		prev === 'text' ? 'password' : 'text'
	)

	return (
		<TextInput type={type} {...props}>
			<button
				type="button"
				onClick={togglePassShownHandler}
				aria-label={type === 'password' ? 'Показать пароль' : 'Скрыть пароль'}
				// TODO СДЕЛАТЬ ПЕРЕКЛЮЧЕНИЕ ВИДНО НЕ ВИДНО ПАРОЛЬ ИКОНКУ
			/>
		</TextInput>
	)
}

export default PasswordInput
