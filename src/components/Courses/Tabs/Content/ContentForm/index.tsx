import React, { FC } from 'react'

import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import plusIconSrc from 'UI/Button/images/plus.svg'
import ContentFormTable from 'containers/Courses/Tabs/Content/ContentForm/Table'

import cl from './style.module.scss'

interface CoursesTabContentProps {
	openCreateSectionModal: () => void
	openEditSectionModal: () => void
}

const ContentFormTab: FC<CoursesTabContentProps> = ({
	openCreateSectionModal,
	openEditSectionModal
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Список материалов</span>
			<Button
				onClick={openCreateSectionModal}
				styleTypes={[ButtonStyles.ROUND, ButtonStyles.PRIMARY]}
			>
				<img src={plusIconSrc} alt="plus" />
				Добавить новый раздел
			</Button>
		</div>
		<div className={cl.body}>
			<ContentFormTable openEditSectionModal={openEditSectionModal} />
		</div>
	</div>
)

export default ContentFormTab
