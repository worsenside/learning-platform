import React from 'react'

import ContentFormTable from 'containers/Courses/Tabs/Content/StudentsForm/Table'
import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import plusIconSrc from 'UI/Button/images/plus.svg'

import cl from './style.module.scss'

const StudentsFormTab = () => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Просматривайте учеников, поступивших на курс</span>
			<Button styleTypes={[ButtonStyles.ROUND, ButtonStyles.PRIMARY]}>
				<img src={plusIconSrc} alt="plus" />
				Пригласить ученика
			</Button>
		</div>
		<div className={cl.body}>
			<ContentFormTable />
		</div>
	</div>
)

export default StudentsFormTab
