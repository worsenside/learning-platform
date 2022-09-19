import React, { FC } from 'react'

import { getFullName } from 'helpers'

import { DropdownTypes, DropdownProps } from 'UI/Dropdown/types'
import { Dropdown, Avatar } from 'UI'

import cl from 'UI/Dropdown/style.module.scss'
import { dropdownIconSrc } from './images/icons'

export interface ProfileMenuProps extends DropdownProps {}

const ProfileMenu: FC<ProfileMenuProps> = ({
	dropdownItemsList,
	avatarParams = {},
	dropdownTitle
}) => (
	<Dropdown
		dropdownTitle={dropdownTitle}
		dropdownItemsList={dropdownItemsList}
		type={DropdownTypes.PROFILE_MENU}
		avatarParams={avatarParams}
	>
		<Avatar {...avatarParams} />
		<div className={cl.profileInfo}>
			<span>
				{getFullName({
					firstName: avatarParams.firstName,
					lastName: avatarParams.lastName
				})}
			</span>
			<img src={dropdownIconSrc} alt="dropdown" />
		</div>
	</Dropdown>
)

export default ProfileMenu
