import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITask } from 'types/models/task.model'
import { TaskSliceState } from './types'

const initialState: TaskSliceState = {
	task: {
		name: '',
		description: '',
		answerResponsibilitiesType: { isText: true, isFile: false },
		maxCountUploadFiles: 1,
		taskResponsibilityStatus: 1,
		passingScore: 10,
		countAttempts: 5,
		datePassStartSettings: {
			isActive: true,
			start: '',
			end: ''
		},
		datePassEndSettings: {
			isActive: true,
			start: '',
			end: ''
		},
		dateLastChange: new Date().toLocaleDateString(),
		isActive: 1
	}
}

const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		setTask: (state, { payload }: PayloadAction<Partial<ITask<string>>>) => {
			state.task = { ...state.task, ...payload }
		}
	}
})

export default taskSlice
