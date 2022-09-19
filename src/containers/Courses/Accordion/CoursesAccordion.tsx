import React from 'react'

// import { useNavigate } from 'react-router-dom'
// import { Accordion as CustomAccordionComponent } from 'UI'
// import { systemSelector } from 'store/selectors'
import { userQuery } from 'store/queries'
// import { Index } from '..'
// import { ArchivedIcon, PublishedIcon, TrashedIcon } from './icons'

import { CoursesParams, FilterCourses } from '../Table/types'

import cl from './style.module.scss'

const getFilteredCourses = (
	courses: FilterCourses<CoursesParams>,
	type: 'published' | 'trashed' | 'archived'
) => courses?.entities.filter((course) => course.type === type) || []

const CoursesAccordion = () => {
	const { data: usersInfo } = userQuery.useGetUsersQuery({ usersIdList: [] })

	return (
		// const { published, trashed, archived } = {
		// 	published: getFilteredCourses(courses, 'published'),
		// 	trashed: getFilteredCourses(courses, 'trashed'),
		// 	archived: getFilteredCourses(courses, 'archived')
		// }

		<div className={cl.container}>
			asd
			{/* <CustomAccordionComponent */}
			{/* 	label="Опубликованные курсы" */}
			{/* 	iconSrcUrl={PublishedIcon} */}
			{/* 	contentItemsLength={`Курсов - ${published.length}`} */}
			{/* > */}
			{/* 	<Index data={published} /> */}
			{/* </CustomAccordionComponent> */}
			{/* <CustomAccordionComponent */}
			{/* 	label="Черновики" */}
			{/* 	iconSrcUrl={TrashedIcon} */}
			{/* 	contentItemsLength={`Курсов - ${trashed.length}`} */}
			{/* > */}
			{/* 	<Index data={trashed} /> */}
			{/* </CustomAccordionComponent> */}
			{/* <CustomAccordionComponent */}
			{/* 	label="Архивные" */}
			{/* 	iconSrcUrl={ArchivedIcon} */}
			{/* 	contentItemsLength={`Курсов - ${archived.length}`} */}
			{/* > */}
			{/* 	<Index data={archived} /> */}
			{/* </CustomAccordionComponent> */}
		</div>
	)
}

export default CoursesAccordion
