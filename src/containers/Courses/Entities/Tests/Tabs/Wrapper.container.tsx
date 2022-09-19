import React, { FC, NamedExoticComponent, useMemo, useState } from 'react'
import classnames from 'classnames'

import { Tabs } from 'UI'
import { ITab } from 'UI/Tabs/types'
import { getUniqueId } from 'helpers'
import MainFormTab from './Content/MainForm'
import QuestionsFormTab from './Content/QuestionsForm'
import LimitationsFormTab from './Content/LimitationsForm'

import cl from './style.module.scss'

interface TestsTabsProps {
	isPreview?: boolean
}

const TestsTabs: FC<TestsTabsProps> = ({ isPreview = false }) => {
	const tabsList = useMemo(
		(): ITab[] => [
			{ id: getUniqueId(), text: 'Основная информация' },
			{ id: getUniqueId(), text: 'Вопросы' },
			{ id: getUniqueId(), text: 'Ограничения' }
		],
		[]
	)
	const [selectedTabId, setSelectedTabId] = useState<ITab['id']>(tabsList[0].id)

	const TestsTabContent = useMemo(() => {
		const tabsContent: (FC | NamedExoticComponent)[] = [
			MainFormTab,
			QuestionsFormTab,
			LimitationsFormTab
		]
		const CurrentTabContent =
			tabsContent[tabsList.findIndex((tab) => tab.id === selectedTabId)]

		return <CurrentTabContent />
	}, [selectedTabId])

	return (
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
				{TestsTabContent}
			</div>
		</div>
	)
}

export default TestsTabs
