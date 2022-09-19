import React, { FC } from 'react'

import CreateSectionItemModalComponent from 'components/Courses/Tabs/Content/ContentForm/modals/CreateSectionItem'
import {
	lessonIconSrc,
	eventIconSrc,
	taskIconSrc,
	testIconSrc
} from 'containers/Courses/Tabs/Content/ContentForm/icons'

export interface CreateSectionItemModalProps {
	isModalOpen: boolean
	onCloseModal: () => void
}

export interface SectionItemsCreateList {
	id: number
	name: string
	iconUrl: string
	url: string
}

const CreateSectionItemModal: FC<CreateSectionItemModalProps> = (props) => {
	const sectionItemsCreateList: SectionItemsCreateList[] = [
		{
			id: 1,
			name: 'Урок',
			iconUrl: lessonIconSrc,
			url: '/course/lesson/create'
		},
		{
			id: 2,
			name: 'Задание',
			iconUrl: taskIconSrc,
			url: '/course/task/create'
		},
		{
			id: 3,
			name: 'Тестирование',
			iconUrl: testIconSrc,
			url: '/course/test/create'
		},
		{
			id: 4,
			name: 'Мероприятие',
			iconUrl: eventIconSrc,
			url: '#'
		}
	]
	return (
		<CreateSectionItemModalComponent
			sectionItemsCreateList={sectionItemsCreateList}
			{...props}
		/>
	)
}

export default CreateSectionItemModal
