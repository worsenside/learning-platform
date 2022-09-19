import { ResponseEntityId } from 'types'

enum LessonResponsibilityStatus {
	REQUIRED = 1,
	OPTIONAL
}

export enum LessonMediaFiles {
	AUDIO = 'Audio',
	VIDEO = 'Video'
}
interface LessonFile {
	url: string
}

interface LessonMedia extends LessonFile {
	type: LessonMediaFiles
}
interface LessonDoc extends LessonFile {
	title: string
}

export interface ILesson {
	id?: ResponseEntityId
	name: string
	description: string
	lessonResponsibilityStatus: LessonResponsibilityStatus
	mediaFilesInfo?: LessonMedia[]
	docsFilesInfo?: LessonDoc[]
	isActive: number
}
