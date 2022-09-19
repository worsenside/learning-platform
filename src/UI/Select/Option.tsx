import React, { FC } from 'react'
import classnames from 'classnames'

import { IOption } from './types'

import cl from './style.module.scss'

interface OptionProps {
	optionItem: IOption
	onChange: (optionValue: IOption['value']) => void
	value: IOption['value']
}

const Option: FC<OptionProps> = ({ optionItem, onChange, value }) => (
	<li
		className={classnames([cl.option], {
			[cl.optionActive]: value === optionItem.value,
			[cl.optionHidden]: optionItem.hidden
		})}
		onClick={onChange.bind(null, optionItem.value)}
	>
		{optionItem.text}
	</li>
)

export default Option
