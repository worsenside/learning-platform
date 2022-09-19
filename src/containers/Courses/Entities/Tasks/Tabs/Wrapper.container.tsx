import React, { FC, NamedExoticComponent, useMemo, useState } from 'react'
import classnames from 'classnames'

import { getUniqueId } from 'helpers'
import { Tabs } from 'UI'
import { ITab } from 'UI/Tabs/types'
import MainFormTab from './Content/MainForm'
import AnswerSettingsFormTab from './Content/AnswerSettingsForm'
import LimitationsFormTab from './Content/LimitationsForm'

import cl from './style.module.scss'

interface TasksTabsProps {
	isPreview?: boolean
}

const TasksTabs: FC<TasksTabsProps> = ({ isPreview = false }) => {
	const tabsList = useMemo(
		(): ITab[] => [
			{ id: getUniqueId(), text: 'Основная информация' },
			{ id: getUniqueId(), text: 'Настройки ответа' },
			{ id: getUniqueId(), text: 'Ограничения' }
		],
		[]
	)
	const [selectedTabId, setSelectedTabId] = useState<ITab['id']>(tabsList[0].id)

	const TasksTabContent = useMemo(() => {
		const tabsContent: (FC | NamedExoticComponent)[] = [
			MainFormTab,
			AnswerSettingsFormTab,
			LimitationsFormTab
		]
		const CurrentTabContent =
			tabsContent[tabsList.findIndex((tab) => tab.id === selectedTabId)]

		return <CurrentTabContent />
	}, [selectedTabId])

	return (
		// TODO refactor
		<div className={cl.container}>
			<div
				style={{ display: isPreview ? 'none' : 'block' }}
				className={classnames([
					cl.tabsToggles,
					{
						[cl.tabsTogglesHidden]: isPreview
					}
				])}
			>
				<Tabs
					value={selectedTabId}
					tabs={tabsList}
					onChange={setSelectedTabId}
				/>
			</div>
			<div
				style={{ display: isPreview ? 'none' : 'block' }}
				className={classnames([
					cl.tabsContent,
					{
						[cl.tabsContentHidden]: isPreview
					}
				])}
			>
				{TasksTabContent}
			</div>
		</div>
	)
}

export default TasksTabs
