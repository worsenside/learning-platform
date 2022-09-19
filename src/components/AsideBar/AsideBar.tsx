import React, { FC } from 'react'

import AsideBarOptions from './AsideBarOptions'
import { AsideBarProps } from './types'

const AsideBar: FC<AsideBarProps> = ({ asideBarOptionsList }) => (
	<>
		<AsideBarOptions asideBarOptionsList={asideBarOptionsList} />
	</>
)

export default AsideBar
