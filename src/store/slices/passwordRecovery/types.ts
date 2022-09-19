import { ResponseEntityId } from 'types'
import { BaseSliceState } from '../types'

export interface PasswordRecoverySliceState extends BaseSliceState {
	userId?: ResponseEntityId
	passwordRecoveryCode: string
	email: string
}
