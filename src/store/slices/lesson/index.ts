import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ILesson } from 'types/models/lesson.model'
import { LessonSliceState } from './types'

const initialState: LessonSliceState = {
	lesson: {
		name: '',
		description: '',
		mediaFilesInfo: [],
		docsFilesInfo: [],
		lessonResponsibilityStatus: 1,
		isActive: 1
	}
}

const lessonSlice = createSlice({
	name: 'lesson',
	initialState,
	reducers: {
		setLesson: (state, { payload }: PayloadAction<Partial<ILesson>>) => {
			state.lesson = { ...state.lesson, ...payload }
		}
	}
})

export default lessonSlice
