import React, { FC } from 'react'

import LessonViewComponent from 'components/Courses/Entities/Lessons/View'
import { useAppSelector } from 'hooks/redux'

interface LessonViewProps {
	isPreview?: boolean
}

const LessonView: FC<LessonViewProps> = ({ isPreview = true }) => {
	const { lesson } = useAppSelector((state) => state.lesson)

	if (!isPreview) {
		return <></>
	}

	return <LessonViewComponent lesson={lesson} />
}

export default LessonView
