import React, { FC } from 'react'

import Tab from './Tab'
import { ITab } from './types'

import cl from './style.module.scss'

interface TabsProps {
	value: ITab['id']
	tabs: ITab[]
	onChange: (tabId: ITab['id']) => void
}

const Tabs: FC<TabsProps> = ({ tabs, value: selectedId, onChange }) => {
	const clickHandler = (tabId: ITab['id']) => {
		if (tabId === selectedId) {
			return
		}

		onChange(tabId)
	}

	return (
		<div className={cl.tabs}>
			{tabs.map((tab) => (
				<Tab
					tab={tab}
					isActive={tab.id === selectedId}
					key={tab.id}
					onClick={clickHandler}
				/>
			))}
		</div>
	)
}

export default Tabs
