import React, { FC, useEffect, useMemo } from 'react'
import { Control, useWatch } from 'react-hook-form'

import { getUniqueId } from 'helpers'

import { isNil } from 'lodash'
import RadioGroupItem from './Item'
import { IRadioGroupItem } from './types'

interface RadioGroupProps {
	itemsList: IRadioGroupItem[]
	name: string
	control: Control<any>
	onChange: (value: IRadioGroupItem['value']) => void
	disabled?: boolean
	defaultValue?: IRadioGroupItem['value']
}

const RadioGroup: FC<RadioGroupProps> = ({
	itemsList: items,
	name,
	onChange,
	control,
	disabled,
	defaultValue
}) => {
	const itemsList = useMemo(
		() => items.map((item) => ({ ...item, id: getUniqueId(item.id) })),
		[items]
	)

	const value: IRadioGroupItem['value'] = useWatch({
		control,
		name,
		defaultValue
	})
	useEffect(() => {
		if (isNil(value)) {
			return
		}
		onChange(value)
	}, [])
	return (
		<>
			{itemsList.map((radio) => (
				<RadioGroupItem
					key={radio.id}
					name={name}
					value={value}
					onChange={onChange}
					item={radio}
					disabled={disabled}
				/>
			))}
		</>
	)
}
export default RadioGroup
