import { ResponseEntityId } from '../../index'

enum TestTypes {
	INTERMEDIATE = 1,
	FINAL
}
enum TestResponsibilityStatus {
	REQUIRED = 1,
	OPTIONAL = 2
}
interface PassingTimeLimit {
	isActive: boolean
	timeLimitSeconds: number
}

interface DatePassSettings<T extends Date | string> {
	isActive: boolean
	start: T
	end: T
}

export interface Answer {
	id: number
	value: string
	comment?: string
}

enum AnswerType {
	IS_SINGLE = 1,
	IS_MULTIPLE = 2
}

export interface Question {
	name: string
	answerType: AnswerType
	answers: Answer[]
	correctAnswersIndexList: number[]
}

export interface ITest<T extends Date | string = Date> {
	id?: ResponseEntityId
	type: TestTypes
	name: string
	description: string
	questions: Question[]
	testResponsibilityStatus: TestResponsibilityStatus
	passingTimeLimit: PassingTimeLimit
	passingScore: number
	countRightAnswers: number
	datePassStartSettings: DatePassSettings<T>
	datePassEndSettings: DatePassSettings<T>
	isActive: number
}
