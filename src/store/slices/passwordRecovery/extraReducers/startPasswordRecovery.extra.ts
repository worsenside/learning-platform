import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { saveItemToStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { StartPasswordRecoveryParams } from 'API/PasswordRecoveryService/types'
import { PasswordRecoveryService } from 'API'
import systemSlice from 'store/slices/system'
import { PasswordRecoverySliceState } from '../types'

const startPasswordRecovery = createAsyncThunk(
	'passwordRecovery/startExtra',
	async (
		params: StartPasswordRecoveryParams,
		{ rejectWithValue, dispatch }
	) => {
		try {
			await PasswordRecoveryService.start(params)

			return params
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const startPasswordRecoveryExtra = {
	[startPasswordRecovery.fulfilled.type]: (
		state: PasswordRecoverySliceState,
		{ payload }: PayloadAction<Pick<PasswordRecoverySliceState, 'email'>>
	) => {
		state.meta.isLoading = false
		state.email = payload.email
		saveItemToStorage([StorageKeys.PASSWORD_RECOVERY_DATA, payload])
	},
	[startPasswordRecovery.pending.type]: (state: PasswordRecoverySliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[startPasswordRecovery.rejected.type]: (
		state: PasswordRecoverySliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default startPasswordRecovery
