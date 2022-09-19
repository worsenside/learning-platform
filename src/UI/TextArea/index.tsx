import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react'
import classnames from 'classnames'
import { Control, useWatch } from 'react-hook-form'

import { InputValidate } from 'UI/Input/types'
import ValidateNotify from 'UI/Input/ValidateNotify'

import cl from './style.module.scss'

interface TextAreaProps
	extends Omit<
		InputHTMLAttributes<HTMLTextAreaElement>,
		'value' | 'onChange' | 'name'
	> {
	styleTypes?: InputValidate[]
	name: string
	control: Control<any>
	onChange: (value: string) => void
	error?: string
}

const TextArea: FC<TextAreaProps> = ({
	styleTypes = [],
	onChange,
	error,
	name,
	control,
	className,
	...defaultProps
}) => {
	const value: string = useWatch({ control, name })

	return (
		<div className={cl.container}>
			<textarea
				className={classnames([
					cl.textarea,
					{ [cl.textareaValidateError]: !!error },
					className,
					...styleTypes.map((styleType) => cl[`textarea${styleType}`])
				])}
				name={name}
				value={value}
				onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
					onChange(event.target.value)
				}
				{...defaultProps}
			/>
			<ValidateNotify error={error} />
		</div>
	)
}

export default TextArea
