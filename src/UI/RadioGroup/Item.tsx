import React, { InputHTMLAttributes, FC } from 'react'

import { IRadioGroupItem } from './types'

import cl from './style.module.scss'

export interface RadioGroupItemProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
	item: IRadioGroupItem
	value: IRadioGroupItem['value']
	onChange: (value: IRadioGroupItem['value']) => void
	disabled?: boolean
}

const RadioGroupItem: FC<RadioGroupItemProps> = ({
	item,
	value,
	onChange,
	disabled,
	name,
	...defaultProps
}) => (
	<div className={cl.container}>
		<input
			{...defaultProps}
			onChange={onChange.bind(null, item.value)}
			id={item.id}
			type="radio"
			value={item.value}
			name={name}
			checked={+item.value === +value}
			disabled={disabled}
		/>
		<label htmlFor={item.id}>{item.labelTitle}</label>
	</div>
)
export default RadioGroupItem
