import React, { FC } from 'react'

import { Button, Link } from 'UI'
import { LinkStyles, LinkTypes } from 'UI/Link/types'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { DropdownItem } from '../types'

import cl from '../style.module.scss'

interface DefaultDropdownItemProps {
	onClose: () => void
	dropdownItem: DropdownItem
}

const DefaultDropdownItem: FC<DefaultDropdownItemProps> = ({
	onClose,
	dropdownItem
}) => {
	if (dropdownItem.link) {
		return (
			<Link
				type={LinkTypes.DROPDOWN}
				styleTypes={[LinkStyles.DROPDOWN]}
				onClick={onClose}
				href={dropdownItem.link}
			>
				<div className={cl.icon}>
					<img src={dropdownItem.icon} alt="icon" />
				</div>
				{dropdownItem.label}
			</Link>
		)
	}

	return (
		<Button
			styleTypes={[ButtonSizes.WIDE, ButtonStyles.DROPDOWN]}
			aria-label="Перейти к пункту меню"
			onClick={(event) => {
				dropdownItem.onClick?.(event)
				onClose()
			}}
		>
			<img src={dropdownItem.icon} alt="icon" />
			{dropdownItem.label}
		</Button>
	)
}

export default DefaultDropdownItem
