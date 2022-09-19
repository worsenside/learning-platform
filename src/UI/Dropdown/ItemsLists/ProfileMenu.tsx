import React, { FC } from 'react'

import { useMatchMedia } from 'hooks'
import { getFullName } from 'helpers'

import { NotificationsBar } from 'containers/Header'
import { Avatar } from 'UI'
import { IAvatar } from 'UI/Avatar/types'
import { exitIconSrc } from 'components/Header/ProfileMenu/images/icons'
import { DefaultDropdownItem } from '../Items'
import { DefaultDropdownItemsListProps } from './Default'

import cl from '../style.module.scss'

export interface ProfileMenuDropdownItemsListProps
	extends Omit<DefaultDropdownItemsListProps, 'isTableDropdown'>,
		IAvatar {}

const ProfileMenuDropdownItemsList: FC<ProfileMenuDropdownItemsListProps> = ({
	dropdownTitle = '',
	dropdownItemsList,
	onClose,
	firstName,
	lastName,
	photoUrl
}) => {
	const { isMobile } = useMatchMedia()

	return (
		<div className={cl.profileMenuList}>
			{isMobile && (
				<>
					<div onClick={onClose} className={cl.exitButton}>
						<img src={exitIconSrc} alt="exit" />
						<span>Назад</span>
					</div>
					<div className={cl.profileInfoContainer}>
						<Avatar
							firstName={firstName}
							lastName={lastName}
							photoUrl={photoUrl}
						/>
						<span>{getFullName({ firstName, lastName })}</span>
					</div>
					<div className={cl.notificationContainer}>
						<NotificationsBar />
					</div>
					<div className={cl.line} />
				</>
			)}
			<div className={cl.dropdownList}>
				{dropdownTitle && (
					<div className={cl.dropdownTitle}>{dropdownTitle}</div>
				)}
				{dropdownItemsList.map((dropdownItem) => (
					<DefaultDropdownItem
						dropdownItem={dropdownItem}
						key={dropdownItem.id}
						onClose={onClose}
					/>
				))}
			</div>
		</div>
	)
}

export default ProfileMenuDropdownItemsList
