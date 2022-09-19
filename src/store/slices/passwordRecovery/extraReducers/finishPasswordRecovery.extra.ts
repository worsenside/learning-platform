import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { removeItemFromStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { FinishPasswordRecoveryParams } from 'API/PasswordRecoveryService/types'
import { PasswordRecoveryService } from 'API'
import systemSlice from 'store/slices/system'
import { PasswordRecoverySliceState } from '../types'

const finishPasswordRecovery = createAsyncThunk(
	'passwordRecovery/finishExtra',
	async (
		params: FinishPasswordRecoveryParams,
		{ rejectWithValue, dispatch }
	) => {
		try {
			const { token } = await PasswordRecoveryService.finish(params)
			dispatch(systemSlice.actions.logIn(token))
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const finishPasswordRecoveryExtra = {
	[finishPasswordRecovery.fulfilled.type]: (
		state: PasswordRecoverySliceState
	) => {
		state.meta.isLoading = false

		removeItemFromStorage([
			StorageKeys.PASSWORD_RECOVERY_DATA,
			StorageKeys.PASSWORD_RECOVERY_STEP
		])
	},
	[finishPasswordRecovery.pending.type]: (
		state: PasswordRecoverySliceState
	) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[finishPasswordRecovery.rejected.type]: (
		state: PasswordRecoverySliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default finishPasswordRecovery
