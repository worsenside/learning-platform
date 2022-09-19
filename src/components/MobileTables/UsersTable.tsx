import React, { FC } from 'react'

import { Avatar, Dropdown } from 'UI'
import { actionIconSrc } from 'containers/Users/Table/images/icons'
import { UsersTableMobileProps } from 'containers/MobileTables/UsersTable'
import { DropdownItem } from 'UI/Dropdown/types'
import { ResponseEntityId } from 'types'

import cl from './style.module.scss'

interface UsersMobileTableParams extends UsersTableMobileProps {
	getDropdownItemsList: (id: ResponseEntityId) => DropdownItem[]
}

const UsersTable: FC<UsersMobileTableParams> = ({
	data,
	getDropdownItemsList
}) => (
	<div className={cl.tableMobile}>
		{data.map((user) => (
			<div key={user.id} className={cl.tableMobileCell}>
				<div className={cl.mobileHeader}>
					<div className={cl.personalInfo}>
						<Avatar
							firstName={user.firstName}
							lastName={user.lastName}
							photoUrl={user.avatarUrl}
						/>
						<span className={cl.initialsOfName}>
							{user.firstName} {user.lastName}
						</span>
					</div>
					<Dropdown dropdownItemsList={getDropdownItemsList(user.id)}>
						<img src={actionIconSrc} alt="actions" />
					</Dropdown>
				</div>
				<div className={cl.mobileBody}>
					<div className={cl.mobileItem}>
						<p>Электронная почта</p>
						<p>{user.email}</p>
					</div>
					<div className={cl.mobileItem}>
						<p>Дата последней авторизации</p>
						<p>
							{user.lastLoginDate ? user.lastLoginDate : 'Не входил в систему'}
						</p>
					</div>
					<div className={cl.mobileItem}>
						<p>Дата создания</p>
						<p>{user.createdDate}</p>
					</div>
				</div>
			</div>
		))}
	</div>
)

export default UsersTable
