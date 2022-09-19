import React from 'react'
import { useRoutes } from 'react-router-dom'

import { AuthLayout } from 'layouts'
import {
	RegistrationPage,
	AuthorizationPage,
	PasswordRecoveryPage
} from 'pages/Auth'
import CheckRoutesList from './check.routes.list'

const GuestRoutes = () =>
	useRoutes([
		{
			path: '/',
			element: <AuthLayout />,
			children: [
				{
					index: true,
					element: <AuthorizationPage />
				},
				{
					path: 'registration',
					element: <RegistrationPage />
				},
				{
					path: 'password-recovery',
					element: <PasswordRecoveryPage />
				},
				...CheckRoutesList
			]
		}
	])

export default GuestRoutes
