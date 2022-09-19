import React, { useState } from 'react'

import { Button, Link } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import { ButtonStyles } from 'UI/Button/types'

import LessonsTabs from 'containers/Courses/Entities/Lessons/Tabs/Wrapper.container'
import LessonStatus from 'containers/Courses/Entities/Lessons/LessonStatus'
import LessonView from 'containers/Courses/Entities/Lessons/View'

import cl from '../style.module.scss'

const LessonCreatePage = () => {
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
					<h2>Новый урок</h2>
					<LessonStatus />
				</div>
				<Button
					onClick={() => setIsPreview((prev) => !prev)}
					styleTypes={[ButtonStyles.ROUND, ButtonStyles.OUTLINE_DARK]}
				>
					{isPreview ? 'Вернуться к редактированию' : 'Предпросмотр'}
				</Button>
			</div>
			<LessonView isPreview={isPreview} />
			<LessonsTabs isPreview={isPreview} />
		</div>
	)
}

export default LessonCreatePage
