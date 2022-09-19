import React, { FC } from 'react'

import UsersMobileTable from 'components/MobileTables/UsersTable'
import { DropdownItem } from 'UI/Dropdown/types'
import { ResponseEntityId } from 'types'
import { IUser } from 'types/models/user.model'

export interface UsersTableMobileProps {
	data: IUser[]
	getDropdownItemsList: (id: ResponseEntityId) => DropdownItem[]
}

const UsersMobile: FC<UsersTableMobileProps> = ({
	data,
	getDropdownItemsList
}) => (
	<UsersMobileTable getDropdownItemsList={getDropdownItemsList} data={data} />
)

export default UsersMobile
