import React from 'react'

import { UsersInvite, UsersTable } from 'containers/Users'

import cl from 'pages/style.module.scss'

const SchoolUsersListPage = () => (
	<div className={cl.asidePageContainer}>
		<div className={cl.header}>
			<h2>Управление пользователями</h2>
			<UsersInvite />
		</div>
		<div className={cl.content}>
			<UsersTable />
		</div>
	</div>
)

export default SchoolUsersListPage
