import { createSlice } from '@reduxjs/toolkit'

import { getItemFromStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import {
	startPasswordRecoveryExtra,
	checkPasswordRecoveryCodeExtra,
	finishPasswordRecoveryExtra
} from './extraReducers/extra'
import { PasswordRecoverySliceState } from './types'

const initialState: PasswordRecoverySliceState = {
	...getItemFromStorage(StorageKeys.PASSWORD_RECOVERY_DATA, {
		passwordRecoveryCode: '',
		email: ''
	}),
	meta: {
		isLoading: false,
		error: ''
	}
}

const passwordRecoverySlice = createSlice({
	name: 'passwordRecovery',
	initialState,
	reducers: {},
	extraReducers: {
		...startPasswordRecoveryExtra,
		...checkPasswordRecoveryCodeExtra,
		...finishPasswordRecoveryExtra
	}
})

export default passwordRecoverySlice
