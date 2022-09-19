import React, { useState } from 'react'

import { Button, Link } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import TestStatus from 'containers/Courses/Entities/Tests/TestStatus'
import { ButtonStyles } from 'UI/Button/types'
import TestsTabs from 'containers/Courses/Entities/Tests/Tabs/Wrapper.container'

import cl from '../style.module.scss'

const TestCreatePage = () => {
	const [isPreview, setIsPreview] = useState(false)
	return (
		<div className={cl.container}>
			<div className={cl.back}>
				<Link styleTypes={[LinkStyles.GO_BACK]} href="/course/create">
					Вернуться назад к курсу
				</Link>
			</div>
			<div className={cl.header}>
				<div className={cl.headerLessonInfo}>
					<h2>Новое тестирование</h2>
					<TestStatus />
				</div>
				<Button
					onClick={() => setIsPreview((prev) => !prev)}
					styleTypes={[ButtonStyles.ROUND, ButtonStyles.OUTLINE_DARK]}
				>
					{isPreview ? 'Вернуться к редактированию' : 'Предпросмотр'}
				</Button>
			</div>
			<TestsTabs isPreview={isPreview} />
		</div>
	)
}

export default TestCreatePage
