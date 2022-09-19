import React, { FC } from 'react'

import TaskViewComponent from 'components/Courses/Entities/Tasks/View'
import { useAppSelector } from 'hooks/redux'

interface TaskViewProps {
	isPreview?: boolean
}

const LessonView: FC<TaskViewProps> = ({ isPreview = true }) => {
	const { task } = useAppSelector((state) => state.task)

	if (!isPreview) {
		return <></>
	}

	return <TaskViewComponent task={task} />
}

export default LessonView
