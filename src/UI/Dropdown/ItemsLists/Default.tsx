import React, { FC } from 'react'
import classnames from 'classnames'

import { Button } from 'UI'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { DefaultDropdownItem } from '../Items'
import { DropdownItem } from '../types'

import cl from '../style.module.scss'

export interface DefaultDropdownItemsListProps {
	dropdownTitle?: string
	dropdownItemsList: DropdownItem[]
	className?: string
	isTableDropdown?: boolean
	onClose: () => void
}

const DefaultDropdownItemsList: FC<DefaultDropdownItemsListProps> = ({
	dropdownTitle,
	dropdownItemsList,
	onClose,
	className,
	isTableDropdown
}) => {
	const listStyles = classnames([cl.list], {
		[className as string]: !!className
	})
	return (
		<div className={listStyles}>
			{dropdownItemsList.map((dropdownItem) => (
				<DefaultDropdownItem
					dropdownItem={dropdownItem}
					key={dropdownItem.id}
					onClose={onClose}
				/>
			))}
			{isTableDropdown && (
				<div className={cl.dropdownCloseBtn}>
					<Button
						onClick={onClose}
						styleTypes={[ButtonStyles.DROPDOWN, ButtonSizes.WIDE]}
					>
						Отмена
					</Button>
				</div>
			)}
		</div>
	)
}
export default DefaultDropdownItemsList
