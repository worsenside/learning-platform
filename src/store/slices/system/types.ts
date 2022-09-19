import { NodeElementsId } from 'types'

export interface ErrorElement {
	id: NodeElementsId
	message: string
}

export interface SystemSliceState {
	isAuth: boolean
	isLoading: boolean
	token: string
	errorElementsList: ErrorElement[]
	haveRegistrationCongratulations: boolean
}
