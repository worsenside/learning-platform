import React, {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
	useMemo,
	useState
} from 'react'
import { Control, useWatch } from 'react-hook-form'

import { getUniqueId } from 'helpers'

import cl from './style.module.scss'

interface SwitchProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'value' | 'onChange' | 'name'
	> {
	labelTitle: string
	control: Control<any>
	name: string
	onChange: (value: boolean) => void
	error?: string
}

const Switch: FC<SwitchProps> = ({
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
		<div className={cl.switch}>
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

export default Switch
