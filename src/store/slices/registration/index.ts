import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getItemFromStorage, saveItemToStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { SchoolRoles } from 'types/models/school.model'
import {
	startRegistrationExtra,
	breakRegistrationExtra,
	repeatRegistrationCodeExtra,
	checkRegistrationCodeExtra,
	finishRegistrationExtra
} from './extraReducers/extra'
import { RegistrationSliceState } from './types'

const initialState: RegistrationSliceState = {
	...getItemFromStorage(StorageKeys.REGISTRATION_DATA, {
		registrationCode: '',
		email: ''
	}),
	meta: {
		isLoading: false,
		error: ''
	}
}

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		chooseSchoolRole(state, { payload }: PayloadAction<SchoolRoles>) {
			state.schoolRole = payload

			saveItemToStorage([
				StorageKeys.REGISTRATION_DATA,
				{ schoolRole: payload }
			])
		}
	},
	extraReducers: {
		...startRegistrationExtra,
		...breakRegistrationExtra,
		...repeatRegistrationCodeExtra,
		...checkRegistrationCodeExtra,
		...finishRegistrationExtra
	}
})

export default registrationSlice
