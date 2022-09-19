import React, { useCallback, useState } from 'react'

import { ContentFormTab as ContentFormTabComponent } from 'components/Courses/Tabs/Content'
import CreateSectionModal from './modals/CreateSection'
import EditSectionModal from './modals/EditSection'

const ContentFormTab = () => {
	const [createSectionModalIsOpen, setCreateSectionModalIsOpen] =
		useState(false)
	const [editSectionModalIsOpen, setEditSectionModalIsOpen] = useState(false)
	const openCreateSectionModalHandler = useCallback(() => {
		setCreateSectionModalIsOpen(true)
	}, [])
	const openEditSectionModalHandler = useCallback(() => {
		setEditSectionModalIsOpen(true)
	}, [])
	const closeCreateSectionModalHandler = useCallback(() => {
		setCreateSectionModalIsOpen(false)
	}, [])
	const closeEditSectionModalHandler = useCallback(() => {
		setEditSectionModalIsOpen(false)
	}, [])

	return (
		<>
			<EditSectionModal
				isModalOpen={editSectionModalIsOpen}
				closeModal={closeEditSectionModalHandler}
			/>
			<CreateSectionModal
				closeModal={closeCreateSectionModalHandler}
				isModalOpen={createSectionModalIsOpen}
			/>
			<ContentFormTabComponent
				openCreateSectionModal={openCreateSectionModalHandler}
				openEditSectionModal={openEditSectionModalHandler}
			/>
		</>
	)
}

export default ContentFormTab
