import React, { FC } from 'react'
import classnames from 'classnames'

import { ITab } from './types'

import cl from './style.module.scss'

interface TabProps {
	tab: ITab
	isActive: boolean
	onClick: (tabId: ITab['id']) => void
}

const Tab: FC<TabProps> = ({ tab, isActive, onClick }) => (
	<div
		className={classnames([cl.tab], {
			[cl.tabSelected]: isActive
		})}
		onClick={onClick.bind(null, tab.id)}
	>
		<p>{tab.text}</p>
	</div>
)

export default Tab
