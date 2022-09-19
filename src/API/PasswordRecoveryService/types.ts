import { ResponseEntityId } from 'types'

export interface PasswordRecoveryService {
	start: StartPasswordRecovery
	checkCode: CheckPasswordRecoveryCode
	finish: FinishPasswordRecovery
}

export interface StartPasswordRecoveryParams {
	email: string
}
type StartPasswordRecovery = (
	params: StartPasswordRecoveryParams
) => Promise<void>

export interface CheckPasswordRecoveryCodeParams {
	userId: ResponseEntityId
	passwordRecoveryCode: string
}
type CheckPasswordRecoveryCode = (
	params: CheckPasswordRecoveryCodeParams
) => Promise<void>

export interface FinishPasswordRecoveryParams {
	userId: ResponseEntityId
	passwordRecoveryCode: string
	password: string
}

// TODO rename jwt
interface FinishRegistrationValue {
	token: string
}
type FinishPasswordRecovery = (
	params: FinishPasswordRecoveryParams
) => Promise<FinishRegistrationValue>

export enum PasswordRecoveryApiRoutes {
	START_PASSWORD_RECOVERY = 'auth/recovery-pass-start',
	CHECK_PASSWORD_RECOVERY_CODE = 'auth/recovery-pass-check-code',
	FINISH_PASSWORD_RECOVERY = 'auth/recovery-pass-finish'
}
