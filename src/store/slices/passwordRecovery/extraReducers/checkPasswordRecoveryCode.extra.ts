import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { saveItemToStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { CheckPasswordRecoveryCodeParams } from 'API/PasswordRecoveryService/types'
import { PasswordRecoveryService } from 'API'
import systemSlice from 'store/slices/system'
import { PasswordRecoverySliceState } from '../types'

const checkPasswordRecoveryCode = createAsyncThunk(
	'passwordRecovery/checkCodeExtra',
	async (
		params: CheckPasswordRecoveryCodeParams,
		{ rejectWithValue, dispatch }
	) => {
		try {
			await PasswordRecoveryService.checkCode(params)

			return params
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const checkPasswordRecoveryCodeExtra = {
	[checkPasswordRecoveryCode.fulfilled.type]: (
		state: PasswordRecoverySliceState,
		{
			payload
		}: PayloadAction<
			Pick<PasswordRecoverySliceState, 'userId' | 'passwordRecoveryCode'>
		>
	) => {
		state.meta.isLoading = false

		state.userId = payload.userId
		state.passwordRecoveryCode = payload.passwordRecoveryCode
		saveItemToStorage([StorageKeys.PASSWORD_RECOVERY_DATA, payload])
	},
	[checkPasswordRecoveryCode.pending.type]: (
		state: PasswordRecoverySliceState
	) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[checkPasswordRecoveryCode.rejected.type]: (
		state: PasswordRecoverySliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default checkPasswordRecoveryCode
