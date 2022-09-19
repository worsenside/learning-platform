import { ITask } from 'types/models/task.model'

export interface TaskSliceState {
	task: Partial<ITask<string>>
}
