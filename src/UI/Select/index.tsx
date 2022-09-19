import React, { FC, SelectHTMLAttributes, useRef, useState } from 'react'
import { Control, useWatch } from 'react-hook-form'
import classnames from 'classnames'

import { useOnClickOutside } from 'hooks'

import Option from './Option'
import { IOption, SelectBorderStyles, SelectSizeStyles } from './types'

import cl from './style.module.scss'
import { ButtonTextStyles } from '../Button/types'

interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
	styleTypes?: (SelectSizeStyles | SelectBorderStyles)[]
	optionsList: IOption[]
	placeholder?: string
	onChange: (value: IOption['value']) => void
	control: Control<any>
	name: string
}

const Select: FC<SelectProps> = ({
	optionsList,
	styleTypes: styleTypesProps = [],
	placeholder = 'Не выбрано',
	className,
	onChange,
	control,
	name
}) => {
	const value: IOption['value'] = useWatch({ control, name })
	const styleTypes = [ButtonTextStyles.MEDIUM, ...styleTypesProps]
	const [isOpen, setIsOpen] = useState(false)

	const selectContainerRef = useRef(null)

	const selectedTextStyles = classnames([cl.selectedText], {
		[cl.selectedTextActive]: isOpen
	})
	const selectOptionsStyles = classnames([cl.selectOptions], {
		[cl.selectOptionsShow]: isOpen
	})

	const changeHandler = async (optionValue: IOption['value']) => {
		onChange(optionValue)

		setIsOpen(false)
	}

	const toggleHandler = setIsOpen.bind(null, (prev) => !prev)

	useOnClickOutside<HTMLDivElement>(
		selectContainerRef,
		setIsOpen.bind(null, false)
	)

	return (
		<div
			ref={selectContainerRef}
			className={classnames([
				cl.selectContainer,
				className,
				...styleTypes.map((styleType) => cl[`selectContainer${styleType}`])
			])}
		>
			<div tabIndex={0} onClick={toggleHandler} className={selectedTextStyles}>
				{optionsList.find((option) => option.value === value)?.text ||
					placeholder}
			</div>
			<ul className={selectOptionsStyles}>
				{optionsList.map((option) => (
					<Option
						value={value}
						onChange={changeHandler}
						key={option.value}
						optionItem={option}
					/>
				))}
			</ul>
		</div>
	)
}

export default Select
