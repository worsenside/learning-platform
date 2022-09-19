export type ResponseEntityId = number
export type NodeElementsId = string
export type FileId = string

export interface FilterWithPagination {
	paginationParams?: [page: number, limit: number]
}

export interface ResponseEntitiesList<T> {
	data: T[]
	total: number
}

export interface AsyncThunkActionResponse {
	meta: { requestStatus: 'rejected' | 'fulfilled' }
}

export interface ResponseWithError {
	error: {
		status: number,
		data: {
			message: string,
		},
	}
}

export enum Constants {
	YEAR_LIST_LIMIT = 100,
	API_BASE_URL = 'http://dev.znaviki.ru/api',
	PASSWORD_MIN_LENGTH = 8,
	SUPPORT_EMAIL = 'support@mail.ru',
	REPEAT_CODE_TIMEOUT_SECONDS = 60
}

export enum StorageKeys {
	REGISTRATION_DATA = 'REGISTRATION_DATA',
	PASSWORD_RECOVERY_DATA = 'PASSWORD_RECOVERY_DATA',
	REGISTRATION_STEP = 'REGISTRATION_STEP',
	PASSWORD_RECOVERY_STEP = 'PASSWORD_RECOVERY_STEP',
	TOKEN = 'TOKEN'
}

export enum ValidationErrorMessages {
	EMPTY = 'Заполните поле',
	INCORRECT = 'Неверный формат',
	DATEPICKER_INCORRECT = 'Заполните информацию полностью',
	PASSING_SCORE_INCORRECT = 'Введите число от 0 до 10',
	ATTEMPT_COUNT_INCORRECT = 'Введите число от 5 до 10',
	PASSWORD_NOT_EQUALS = 'Пароли не совпадают',
	CHOOSE_AT_LEAST_ONE = 'Выберите хотя бы один вариант'
}

export enum PatternsType {
	TRIM_STRING = 'TRIM_STRING',
	MAX_NUMBER = 'MAX_NUMBER'
}
