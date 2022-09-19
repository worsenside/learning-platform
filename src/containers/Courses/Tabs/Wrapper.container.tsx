import React, { FC, useMemo, NamedExoticComponent, useState } from 'react'

import { getUniqueId } from 'helpers'

import { Tabs } from 'UI'
import { ITab } from 'UI/Tabs/types'
import { ContentFormTab, MainFormTab } from 'containers/Courses/Tabs/Content'
import NotificationsFormTab from './Content/NotificationsForm'

import cl from './style.module.scss'
import AccessFormTab from './Content/AccessForm'
import StudentsFormTab from './Content/StudentsForm'

const CoursesTabs: FC = () => {
	const tabsList = useMemo(
		(): ITab[] => [
			{ id: getUniqueId(), text: 'Основные' },
			{ id: getUniqueId(), text: 'Содержание' },
			{ id: getUniqueId(), text: 'Уведомления' },
			{ id: getUniqueId(), text: 'Управления доступом' },
			{ id: getUniqueId(), text: 'Ученики' }
		],
		[]
	)

	const [selectedTabId, setSelectedTabId] = useState<ITab['id']>(
		[...tabsList].shift()!.id
	)

	const CoursesTabContent = useMemo(() => {
		const tabsContent: (FC | NamedExoticComponent)[] = [
			MainFormTab,
			ContentFormTab,
			NotificationsFormTab,
			AccessFormTab,
			StudentsFormTab
		]

		const CurrentTabContent =
			tabsContent[tabsList.findIndex((tab) => tab.id === selectedTabId)]

		return <CurrentTabContent />
	}, [selectedTabId])

	// TODO при переходе на таб предупреждение модалка о несохраненной форме
	return (
		<div className={cl.container}>
			<div className={cl.tabsToggles}>
				<Tabs
					value={selectedTabId}
					tabs={tabsList}
					onChange={setSelectedTabId}
				/>
			</div>
			<div className={cl.tabsContent}>{CoursesTabContent}</div>
		</div>
	)
}

export default CoursesTabs
