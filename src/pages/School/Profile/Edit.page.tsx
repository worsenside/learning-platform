import React from 'react'

import SchoolForm from 'containers/PersonalSchool/Profile/Form.container'

import cl from 'pages/style.module.scss'

const SchoolProfileEditPage = () => (
	<div className={cl.container}>
		<div className={cl.header}>
			<h2>Настройки школы</h2>
		</div>
		<div className={cl.splitLine} />
		<SchoolForm />
	</div>
)

export default SchoolProfileEditPage
