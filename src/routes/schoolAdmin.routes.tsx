import React from 'react'
import { useRoutes } from 'react-router-dom'

import {
	CourseCreatePage,
	LessonCreatePage,
	TaskCreatePage,
	TestCreatePage
} from 'pages/Course'
import { NotificationsPage, TimetablePage, TariffsPage } from 'pages/Common'
import { UserProfileEditPage, UserProfileViewPage } from 'pages/User'
import {
	SchoolUsersListPage,
	SchoolCoursesListPage,
	SchoolProfileEditPage
} from 'pages/School'
import { UserLayout } from 'layouts'
import checkRoutesList from './check.routes.list'

const SchoolAdminRoutes = () =>
	useRoutes([
		{
			path: '/',
			element: <UserLayout />,
			children: [
				{
					index: true,
					element: <SchoolCoursesListPage />
				},
				{
					path: '/course',
					children: [
						{ path: '/course/create', element: <CourseCreatePage /> },
						{ path: '/course/lesson/create', element: <LessonCreatePage /> },
						{ path: '/course/task/create', element: <TaskCreatePage /> },
						{ path: '/course/test/create', element: <TestCreatePage /> }
					]
				},
				{
					path: '/user',
					children: [
						{
							path: '/user/list/*',
							element: <SchoolUsersListPage />
						},
						{
							path: '/user/:userId',
							element: <UserProfileViewPage />
						}
					]
				},
				{
					path: '/profile',
					children: [
						{
							index: true,
							path: '/profile/user/*',
							element: <UserProfileEditPage />
						},
						{ path: '/profile/school/*', element: <SchoolProfileEditPage /> }
					]
				},
				{
					path: '/notifications',
					element: <NotificationsPage />
				},
				{
					path: '/timetable',
					element: <TimetablePage />
				},
				{
					path: '/tariffs',
					element: <TariffsPage />
				},
				...checkRoutesList
			]
		},
		{
			path: '*',
			element: <UserLayout />,
			children: [
				{
					index: true,
					element: <SchoolCoursesListPage />
				}
			]
		}
	])

export default SchoolAdminRoutes
