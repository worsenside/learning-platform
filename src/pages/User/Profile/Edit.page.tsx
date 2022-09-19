import React from 'react'

import UserProfileForm from 'containers/PersonalUser/Profile/Form.container'

import cl from 'pages/style.module.scss'

const UserProfileEditPage = () => (
	<div className={cl.container}>
		<div className={cl.header}>
			<h2>Настройки профиля</h2>
		</div>
		<div className={cl.splitLine} />
		<UserProfileForm />
	</div>
)

export default UserProfileEditPage
