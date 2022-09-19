import { ResponseEntityId } from 'types'

export interface AnswerResponsibilitiesType {
	isText: boolean
	isFile: boolean
}
enum TaskResponsibilityStatus {
	REQUIRED = 1,
	OPTIONAL = 2
}

interface DatePassSettings<T extends Date | string> {
	isActive: boolean
	start: T
	end: T
}

export interface ITask<T extends Date | string = Date> {
	id?: ResponseEntityId
	name: string
	description: string
	answerResponsibilitiesType: AnswerResponsibilitiesType
	maxCountUploadFiles: number
	taskResponsibilityStatus: TaskResponsibilityStatus
	passingScore: number
	countAttempts: number
	datePassStartSettings: DatePassSettings<T>
	datePassEndSettings: DatePassSettings<T>
	dateLastChange: T
	isActive: number
}

interface TaskAnswerDoc {
	title: string
	url: string
}

export interface ITaskAnswer {
	answer: string
	docsFilesInfo?: TaskAnswerDoc[] | TaskAnswerDoc
}
