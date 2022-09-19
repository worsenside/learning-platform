import React, { useState } from 'react'

import { Button, Link } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import LessonStatus from 'containers/Courses/Entities/Lessons/LessonStatus'
import TaskView from 'containers/Courses/Entities/Tasks/View'
import { ButtonStyles } from 'UI/Button/types'

import TasksTabs from 'containers/Courses/Entities/Tasks/Tabs/Wrapper.container'
import cl from '../style.module.scss'

const TaskCreatePage = () => {
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
					<h2>Новое задание</h2>
					<LessonStatus />
				</div>
				<Button
					onClick={() => setIsPreview((prev) => !prev)}
					styleTypes={[ButtonStyles.ROUND, ButtonStyles.OUTLINE_DARK]}
				>
					{isPreview ? 'Вернуться к редактированию' : 'Предпросмотр'}
				</Button>
			</div>
			<TaskView isPreview={isPreview} />
			<TasksTabs isPreview={isPreview} />
		</div>
	)
}

export default TaskCreatePage
