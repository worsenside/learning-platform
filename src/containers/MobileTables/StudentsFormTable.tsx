import React, { FC } from 'react'
import StudentsFormTableMobile from 'components/MobileTables/StudentsFormTable'
import { IUser } from 'types/models/user.model'
import { ResponseEntityId } from 'types'
import { DropdownItem } from 'UI/Dropdown/types'

export interface StudentsFormTableMobileProps {
	data: IUser[]
	getDropdownItemsList: (id: ResponseEntityId) => DropdownItem[]
}

const StudentsFormTable: FC<StudentsFormTableMobileProps> = ({
	getDropdownItemsList,
	data
}) => (
	<StudentsFormTableMobile
		getDropdownItemsList={getDropdownItemsList}
		data={data}
	/>
)

export default StudentsFormTable
