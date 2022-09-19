import React, { FC, useCallback, useRef, useState } from 'react'

import { useDisableWindowScroll, useMatchMedia, useOnClickOutside } from 'hooks'

import {
	DefaultDropdownItemsList,
	ProfileMenuDropdownItemsList
} from './ItemsLists'
import { DropdownProps, DropdownTypes } from './types'

import dropdownIconSrc from './images/dropdown-icon.svg'
import cl from './style.module.scss'

const Dropdown: FC<DropdownProps> = ({
	dropdownTitle = '',
	type = DropdownTypes.DEFAULT,
	avatarParams = {},
	dropdownItemsList,
	labelText,
	children
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownContainer = useRef(null)

	const { isMobile } = useMatchMedia()

	const closeHandler = useCallback(setIsOpen.bind(null, false), [])
	const toggleHandler = useCallback(
		setIsOpen.bind(null, (prev) => !prev),
		[]
	)

	useDisableWindowScroll(isOpen && isMobile)
	useOnClickOutside<HTMLDivElement>(dropdownContainer, closeHandler)

	return (
		<div ref={dropdownContainer} className={cl.container}>
			<div onClick={toggleHandler} className={cl.title}>
				{labelText ? (
					<>
						<span>{labelText}</span>
						<img src={dropdownIconSrc} alt="dropdown" />
					</>
				) : (
					children
				)}
			</div>
			{isOpen && (
				<>
					{type === DropdownTypes.DEFAULT && (
						<DefaultDropdownItemsList
							isTableDropdown={isMobile}
							onClose={closeHandler}
							dropdownItemsList={dropdownItemsList}
						/>
					)}
					{type === DropdownTypes.PROFILE_MENU && (
						<ProfileMenuDropdownItemsList
							{...avatarParams}
							dropdownTitle={dropdownTitle}
							onClose={closeHandler}
							dropdownItemsList={dropdownItemsList}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default Dropdown
