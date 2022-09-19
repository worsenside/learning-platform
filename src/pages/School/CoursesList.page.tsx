import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import CoursesAccordion from 'containers/Courses/Accordion/CoursesAccordion'

import plusIconSrc from 'UI/Button/images/plus.svg'
import cl from 'pages/style.module.scss'

const SchoolCoursesListPage = () => {
	const navigate = useNavigate()
	const clickHandler = () => {
		navigate('/course/create')
	} // TODO ПОМЕНЯТЬ НА ССЫЛКУ
	return (
		<div className={cl.asidePageContainer}>
			<div className={cl.header}>
				<h2>Список курсов</h2>
				<Button
					onClick={clickHandler}
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					<img src={plusIconSrc} alt="plus" />
					Добавить курс
				</Button>
			</div>
			<div className={cl.content}>
				<CoursesAccordion />
			</div>
		</div>
	)
}

export default SchoolCoursesListPage
