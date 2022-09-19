import { ILesson } from 'types/models/lesson.model'

export interface LessonSliceState {
	lesson?: Partial<ILesson>
}
