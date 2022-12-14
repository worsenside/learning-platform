import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUniqueId } from 'helpers'
import ContentFormTableComponent from 'components/Courses/Tabs/Content/ContentForm/Table'
import { ResponseEntityId } from 'types'
import { DropdownItem } from 'UI/Dropdown/types'
import {
	trashIconSrc,
	activateIconSrc,
	deactivateIconSrc,
	editIconSrc
} from './icons'
import CreateSectionItemModal from './modals/CreateSectionItem'

export enum SectionItemType {
	TEST = 'test',
	TASK = 'task',
	EVENT = 'event',
	LESSON = 'lesson'
}

export interface ISectionItem {
	id: ResponseEntityId
	label: string
	dateAdded: string
	dateChanged: string
	activity: boolean
	type: SectionItemType
}

export interface ISection {
	id: ResponseEntityId
	header: string
	items: ISectionItem[]
}

interface ContentFormTableProps {
	openEditSectionModal: () => void
}

const ContentFormTable: FC<ContentFormTableProps> = ({
	openEditSectionModal
}) => {
	const [createSectionItemModalIsOpen, setCreateSectionItemModalIsOpen] =
		useState(false)

	const navigate = useNavigate()

	const openCreateSectionItemModalHandler = () => {
		setCreateSectionItemModalIsOpen(true)
	}
	const closeCreateSectionItemModalHandler = () => {
		setCreateSectionItemModalIsOpen(false)
	}

	const createSectionItemHandler = useCallback((id: ResponseEntityId) => {
		openCreateSectionItemModalHandler()
	}, [])

	const editSectionItemHandler = useCallback((id: ResponseEntityId) => {
		console.log(id, 'edit handler')
	}, [])
	const activateSectionItemHandler = useCallback((id: ResponseEntityId) => {
		console.log(id, 'activate handler')
	}, [])
	const deactivateSectionItemHandler = useCallback((id: ResponseEntityId) => {
		console.log(id, 'deactivate handler')
	}, [])
	const deleteSectionItemHandler = useCallback((id: ResponseEntityId) => {
		console.log(id, 'delete handler')
	}, [])

	const editSectionHandler = useCallback((id: ResponseEntityId) => {
		console.log(id, 'section edit handler')
		openEditSectionModal()
	}, [])
	const deleteSectionHandler = useCallback((id: ResponseEntityId) => {
		console.log(id, 'section delete handler')
	}, [])

	const getDropdownSectionHeader = useCallback(
		(id: ResponseEntityId): DropdownItem[] => [
			{
				id: getUniqueId(),
				icon: editIconSrc,
				label: '??????????????',
				onClick: createSectionItemHandler.bind(null, id)
			},
			{
				id: getUniqueId(),
				icon: editIconSrc,
				label: '??????????????????????????',
				onClick: editSectionHandler.bind(null, id)
			},
			{
				id: getUniqueId(),
				icon: trashIconSrc,
				label: '??????????????',
				onClick: deleteSectionHandler.bind(null, id)
			}
		],
		[editSectionHandler, deleteSectionHandler]
	)

	const getDropdownSectionItemsList = useCallback(
		(id: ResponseEntityId): DropdownItem[] => [
			{
				id: getUniqueId(),
				icon: editIconSrc,
				label: '??????????????????????????',
				onClick: editSectionItemHandler.bind(null, id)
			},
			{
				id: getUniqueId(),
				icon: activateIconSrc,
				label: '????????????????????????',
				onClick: activateSectionItemHandler.bind(null, id)
			},
			{
				id: getUniqueId(),
				icon: deactivateIconSrc,
				label: '????????????????????????????',
				onClick: deactivateSectionItemHandler.bind(null, id)
			},
			{
				id: getUniqueId(),
				icon: trashIconSrc,
				label: '??????????????',
				onClick: deleteSectionItemHandler.bind(null, id)
			}
		],
		[
			editSectionItemHandler,
			activateSectionItemHandler,
			deactivateSectionItemHandler,
			deleteSectionItemHandler
		]
	)

	const sections: ISection[] = [
		{
			id: 1,
			header: '???????????? 1. ?????????????????????????? ????????????',
			items: [
				{
					id: 1,
					label: '??????????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: true,
					type: SectionItemType.TASK
				},
				{
					id: 2,
					label: '????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: true,
					type: SectionItemType.LESSON
				},
				{
					id: 3,
					label: '??????????????????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: false,
					type: SectionItemType.EVENT
				},
				{
					id: 4,
					label: '????????????????????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: true,
					type: SectionItemType.TEST
				}
			]
		},
		{
			id: 2,
			header: '???????????? 2. ???????????????????? ?? ???????????????? ????????????',
			items: [
				{
					id: 1,
					label: '??????????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: true,
					type: SectionItemType.TASK
				},
				{
					id: 2,
					label: '????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: true,
					type: SectionItemType.LESSON
				},
				{
					id: 3,
					label: '??????????????????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: false,
					type: SectionItemType.EVENT
				},
				{
					id: 4,
					label: '????????????????????????',
					dateAdded: '23.12.2022',
					dateChanged: '23.12.2022',
					activity: true,
					type: SectionItemType.TEST
				}
			]
		}
	]
	return (
		<>
			<CreateSectionItemModal
				isModalOpen={createSectionItemModalIsOpen}
				onCloseModal={closeCreateSectionItemModalHandler}
			/>
			<ContentFormTableComponent
				getDropdownSectionItemsList={getDropdownSectionItemsList}
				getDropdownSectionHeader={getDropdownSectionHeader}
				sections={sections}
			/>
		</>
	)
}

export default ContentFormTable
