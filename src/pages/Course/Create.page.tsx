import React from 'react'

import { Button, Link } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import CoursesTabs from 'containers/Courses/Tabs/Wrapper.container'

import cl from './style.module.scss'

const CourseCreatePage = () => (
	<div className={cl.container}>
		<div className={cl.back}>
			<Link styleTypes={[LinkStyles.GO_BACK]} href="/">
				Вернуться назад
			</Link>
		</div>
		<div className={cl.header}>
			<div className={cl.headerInfo}>
				<h2>Новый курс</h2>
				<p>Описание курса</p>
			</div>
			<Button
				styleTypes={[ButtonSizes.BIG, ButtonStyles.ROUND, ButtonStyles.DARK]}
			>
				Выбрать действие
			</Button>
		</div>
		<CoursesTabs />
	</div>
)

export default CourseCreatePage
