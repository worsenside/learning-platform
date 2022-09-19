import React, { FC } from 'react'
import {
	ISection,
	SectionItemType
} from 'containers/Courses/Tabs/Content/ContentForm/Table'
import { actionIconSrc } from 'containers/Users/Table/images/icons'
import { Dropdown } from 'UI'
import { DropdownItem } from 'UI/Dropdown/types'
import {
	lessonIconSrc,
	eventIconSrc,
	taskIconSrc,
	testIconSrc
} from 'containers/Courses/Tabs/Content/ContentForm/icons'

import { ResponseEntityId } from 'types'
import cl from './style.module.scss'

interface ContentFormTableProps {
	sections: ISection[]
	getDropdownSectionHeader: (id: ResponseEntityId) => DropdownItem[]
	getDropdownSectionItemsList: (id: ResponseEntityId) => DropdownItem[]
}

const ContentFormTable: FC<ContentFormTableProps> = ({
	sections,
	getDropdownSectionHeader,
	getDropdownSectionItemsList
}) => (
	<div className={cl.table}>
		<ul className={cl.tableHeader}>
			<li>Занятие</li>
			<li>Дата добавления</li>
			<li>Активность</li>
			<li>Дата изменения</li>
		</ul>
		<div className={cl.tableBodyList}>
			{sections.map((section) => (
				<ul className={cl.tableBody} key={section.id}>
					<div className={cl.tableTh}>
						<h2>{section.header}</h2>
						<Dropdown dropdownItemsList={getDropdownSectionHeader(section.id)}>
							<img src={actionIconSrc} alt="actions" />
						</Dropdown>
					</div>
					<div className={cl.tableTr}>
						{section.items.map((sectionItem) => (
							<ul key={sectionItem.id} className={cl.tableItem}>
								<li>
									{sectionItem.type === SectionItemType.LESSON && (
										<img src={lessonIconSrc} alt="type-lesson" />
									)}
									{sectionItem.type === SectionItemType.EVENT && (
										<img src={eventIconSrc} alt="type-lesson" />
									)}
									{sectionItem.type === SectionItemType.TEST && (
										<img src={testIconSrc} alt="type-lesson" />
									)}
									{sectionItem.type === SectionItemType.TASK && (
										<img src={taskIconSrc} alt="type-lesson" />
									)}
									{sectionItem.label}
								</li>
								<li className={cl.dateAdded}>{sectionItem.dateAdded}</li>
								<li className={cl.activity}>
									{sectionItem.activity ? 'Да' : 'Нет'}
								</li>
								<li className={cl.dateChanged}>{sectionItem.dateChanged}</li>
								<li>
									<div className={cl.moreInfoBtn}>Подробнее</div>
									<Dropdown
										dropdownItemsList={getDropdownSectionItemsList(
											sectionItem.id
										)}
									>
										<img src={actionIconSrc} alt="actions" />
									</Dropdown>
								</li>
							</ul>
						))}
					</div>
				</ul>
			))}
		</div>
	</div>
)

export default ContentFormTable
