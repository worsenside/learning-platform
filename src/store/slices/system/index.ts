import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
	getItemFromStorage,
	removeItemFromStorage,
	saveItemToStorage
} from 'helpers/storage'
import { getUniqueId } from 'helpers'

import { StorageKeys, NodeElementsId } from 'types'
import { ErrorElement, SystemSliceState } from './types'

const initialState: SystemSliceState = {
	isAuth: false,
	isLoading: true,
	token: getItemFromStorage(StorageKeys.TOKEN, ''),
	errorElementsList: [],
	haveRegistrationCongratulations: false
}

const systemSlice = createSlice({
	name: 'system',
	initialState,
	reducers: {
		logIn(state, { payload }: PayloadAction<string | undefined>) {
			state.isAuth = true

			if (payload && payload !== state.token) {
				state.token = payload

				saveItemToStorage([StorageKeys.TOKEN, payload])
			}
		},
		finishCheckAuthorization(state) {
			state.isLoading = false
		},
		pushError(state, { payload }: PayloadAction<Omit<ErrorElement, 'id'>>) {
			const errorId = getUniqueId()

			state.errorElementsList.push({
				id: errorId,
				...payload
			})
		},
		clearError(state, { payload }: PayloadAction<NodeElementsId>) {
			state.errorElementsList = state.errorElementsList.filter(
				({ id }) => id !== payload
			)
		},
		congratulationsOnRegistration(state) {
			state.haveRegistrationCongratulations = true
		},
		breakCongratulationsOnRegistration(state) {
			state.haveRegistrationCongratulations = false
		},
		logOut(state) {
			state.isAuth = false
			state.token = ''

			removeItemFromStorage([StorageKeys.TOKEN])
		}
	}
})

export default systemSlice
