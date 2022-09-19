import React, { ButtonHTMLAttributes, FC } from 'react'
import classnames from 'classnames'

import { ButtonSizes, ButtonStyles, ButtonTextStyles } from './types'

import cl from './style.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	styleTypes?: (ButtonTextStyles | ButtonSizes | ButtonStyles)[]
}

const Button: FC<ButtonProps> = ({
	styleTypes: styleTypesProps = [],
	children,
	onClick,
	className,
	disabled,
	type = 'button',
	...defaultProps
}) => {
	const styleTypes = [ButtonTextStyles.MEDIUM, ...styleTypesProps]

	return (
		<button
			onClick={(event) => !disabled && onClick?.(event)}
			className={classnames([
				cl.btn,
				className,
				...styleTypes.map((styleType) => cl[`btn${styleType}`])
			])}
			disabled={disabled}
			type={type}
			{...defaultProps}
		>
			{children}
		</button>
	)
}

export default Button
