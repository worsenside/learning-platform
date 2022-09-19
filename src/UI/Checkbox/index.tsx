import React, { ChangeEvent, FC, InputHTMLAttributes, useMemo } from 'react'
import { Control, useWatch } from 'react-hook-form'

import { getUniqueId } from 'helpers'

import cl from './style.module.scss'

interface CheckboxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'value' | 'onChange' | 'name'
	> {
	onChange: (value: boolean) => void
	name: string
	control: Control<any>
	labelTitle: string
}

const Checkbox: FC<CheckboxProps> = ({
	id,
	labelTitle,
	onChange,
	control,
	name,
	...defaultProps
}) => {
	const uniqueId = useMemo(getUniqueId.bind(null, id), [])

	const value: boolean = useWatch({ control, name, defaultValue: false })

	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked)
	}

	return (
		<div className={cl.container}>
			<input
				checked={value}
				id={uniqueId}
				onChange={changeHandler}
				type="checkbox"
				name={name}
				{...defaultProps}
			/>
			<label htmlFor={uniqueId}>{labelTitle}</label>
		</div>
	)
}

export default Checkbox
