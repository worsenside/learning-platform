import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import AlertWrapper from 'containers/AlertWrapper'
import { Logo } from 'UI'

import cl from './style.module.scss'

const AuthLayout: FC = () => (
	<>
		<AlertWrapper />
		<div className={cl.authContainer}>
			<div className={cl.header}>
				<Logo />
			</div>
			<Outlet />
		</div>
	</>
)

export default AuthLayout
