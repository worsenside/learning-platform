import React from 'react'

import { NodeElementsId } from 'types'
import { IAvatar } from 'UI/Avatar/types'
import { DefaultDropdownItemsListProps } from './ItemsLists/Default'

interface DropdownItemDefault {
	id: NodeElementsId
	icon?: string
	label: string
}
interface DropdownItemLink extends DropdownItemDefault {
	link: string
	onClick?: never
}
interface DropdownItemButton extends DropdownItemDefault {
	link?: never
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export type DropdownItem = DropdownItemLink | DropdownItemButton

export enum DropdownTypes {
	DEFAULT,
	PROFILE_MENU
}

export interface DropdownProps
	extends Pick<DefaultDropdownItemsListProps, 'dropdownTitle'> {
	type?: DropdownTypes
	avatarParams?: IAvatar
	dropdownItemsList: DropdownItem[]
	labelText?: string
}
