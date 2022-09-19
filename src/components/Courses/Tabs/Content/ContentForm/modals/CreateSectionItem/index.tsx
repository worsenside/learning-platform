import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Modal } from 'UI'
import {
	CreateSectionItemModalProps as CreateSectionItemModalContainerProps,
	SectionItemsCreateList
} from 'containers/Courses/Tabs/Content/ContentForm/modals/CreateSectionItem'
import { ModalSize } from 'UI/Modal/types'

import cl from './style.module.scss'

interface CreateSectionItemModalProps
	extends CreateSectionItemModalContainerProps {
	sectionItemsCreateList: SectionItemsCreateList[]
}

const CreateSectionItemModal: FC<CreateSectionItemModalProps> = ({
	isModalOpen,
	onCloseModal,
	sectionItemsCreateList
}) => {
	const navigate = useNavigate()
	return (
		<Modal
			title="Вы хотите создать..."
			onClose={onCloseModal}
			isOpen={isModalOpen}
			styleTypes={[ModalSize.BIG]}
		>
			<div className={cl.container}>
				<div className={cl.itemsList}>
					{sectionItemsCreateList.map((sectionCreateItem) => (
						<div
							onClick={() => navigate(`${sectionCreateItem.url}`)}
							key={sectionCreateItem.id}
							className={cl.item}
						>
							<img
								src={sectionCreateItem.iconUrl}
								className={cl.itemIcon}
								alt={sectionCreateItem.name}
							/>
							<p className={cl.itemName}>{sectionCreateItem.name} </p>
						</div>
					))}
				</div>
			</div>
		</Modal>
	)
}

export default CreateSectionItemModal
