import React from 'react'
import { useRoutes } from 'react-router-dom'

import {
	CheckPasswordRecoveryCodeLayout,
	CheckRegistrationCodeLayout
} from 'layouts/check'

const CheckRoutesList = [
	{
		path: '/check',
		children: [
			{
				index: true,
				path: '/check/registration-code',
				element: <CheckRegistrationCodeLayout />
			},
			{
				path: '/check/password-recovery-code',
				element: <CheckPasswordRecoveryCodeLayout />
			}
		]
	}
]

export default CheckRoutesList
