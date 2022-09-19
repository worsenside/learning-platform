import React, { FC } from 'react'
import classnames from 'classnames'
import { UseFieldArrayRemove } from 'react-hook-form'

import { QuestionTabs } from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/Wrapper.container'

import cl from '../style.module.scss'

interface TabProps {
	tab: QuestionTabs
	isActive: boolean
	onClick: (tabId: QuestionTabs['id']) => void
	remove: UseFieldArrayRemove
}

const QuestionTab: FC<TabProps> = ({ tab, isActive, onClick, remove }) => (
	<div
		className={classnames([cl.tab], {
			[cl.tabSelected]: isActive
		})}
		onClick={onClick.bind(null, tab.id)}
	>
		<p>{tab.text}</p>
	</div>
)

export default QuestionTab
