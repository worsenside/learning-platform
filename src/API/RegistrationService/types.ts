import { ResponseEntityId } from 'types'

export interface RegistrationService {
	start: StartRegistration
	break: BreakRegistration
	repeatCode: RepeatRegistrationCode
	checkCode: CheckRegistrationCode
	finish: FinishRegistration
}

export interface StartRegistrationParams {
	firstName: string
	lastName: string
	email: string
	schoolRole: number
}
interface StartRegistrationValue {
	userId: ResponseEntityId
}

type StartRegistration = (
	params: StartRegistrationParams
) => Promise<StartRegistrationValue>

export interface BreakRegistrationParams {
	email?: string
}
type BreakRegistration = (params: BreakRegistrationParams) => Promise<void>

export interface RepeatRegistrationCodeParams {
	userId: ResponseEntityId
}
type RepeatRegistrationCode = (
	params: RepeatRegistrationCodeParams
) => Promise<void>

// TODO registrationCode
export interface CheckRegistrationCodeParams {
	userId: ResponseEntityId
	registrationCode: string
}
type CheckRegistrationCode = (
	params: CheckRegistrationCodeParams
) => Promise<void>

// TODO platform?
export interface FinishRegistrationParams {
	userId: ResponseEntityId
	password: string
	registrationCode: string
}
interface FinishRegistrationValue {
	token: string
}
type FinishRegistration = (
	params: FinishRegistrationParams
) => Promise<FinishRegistrationValue>

export enum RegistrationApiRoutes {
	SELECT_ROLES = 'selects/role',
	START_REGISTRATION = 'auth/reg-start',
	BREAK_REGISTRATION = 'auth/reg-break',
	REPEAT_REGISTRATION_CODE = 'auth/reg-repeat-code',
	CHECK_REGISTRATION_CODE = 'auth/reg-check-code',
	FINISH_REGISTRATION = 'auth/reg-finish'
}
