import { ResponseEntityId } from 'types'
import { BaseSliceState } from '../types'

export interface RegistrationSliceState extends BaseSliceState {
	userId?: ResponseEntityId
	registrationCode?: string
	email?: string
	schoolRole?: number
}
