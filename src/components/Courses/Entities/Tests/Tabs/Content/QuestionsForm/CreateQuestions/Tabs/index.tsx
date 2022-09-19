import React, { FC } from 'react'
import { UseFieldArrayRemove } from 'react-hook-form'

import { QuestionTabs } from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/Wrapper.container'
import Tab from './Tab'

import cl from './style.module.scss'

interface TabsProps {
	selectedTabId?: QuestionTabs['id']
	tabs: QuestionTabs[]
	onSelectTab: (tabId: QuestionTabs['id']) => void
	remove: UseFieldArrayRemove
}

const QuestionsTabs: FC<TabsProps> = ({
	tabs,
	selectedTabId,
	onSelectTab,
	remove
}) => {
	const clickHandler = (tabId: QuestionTabs['id']) => {
		if (tabId === selectedTabId) {
			return
		}

		onSelectTab(tabId)
	}

	return (
		<div className={cl.tabs}>
			{tabs.map((tab) => (
				<Tab
					remove={remove}
					tab={tab}
					isActive={tab.id === selectedTabId}
					key={tab.id}
					onClick={clickHandler}
				/>
			))}
		</div>
	)
}

export default QuestionsTabs
