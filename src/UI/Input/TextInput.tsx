import React, { ChangeEvent, FC } from 'react'
import classnames from 'classnames'
import { useWatch } from 'react-hook-form'

import ValidateNotify from './ValidateNotify'
import { TextInputProps } from './types'

import cl from './style.module.scss'

const TextInput: FC<TextInputProps> = ({
	styleTypes = [],
	children,
	error,
	onChange,
	control,
	defaultValue,
	name,
	...defaultProps
}) => {
	const value: string = useWatch({
		control,
		name,
		defaultValue: defaultValue || ''
	})

	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
		<div className={cl.container}>
			<input
				className={classnames([
					cl.input,
					{ [cl.inputValidateError]: !!error },
					...styleTypes.map((styleType) => cl[`input${styleType}`])
				])}
				{...defaultProps}
				name={name}
				value={value}
				onChange={changeHandler}
			/>
			{children}
			<ValidateNotify error={error} />
		</div>
	)
}

export default TextInput
