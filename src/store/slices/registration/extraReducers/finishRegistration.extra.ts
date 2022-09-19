import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { removeItemFromStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { FinishRegistrationParams } from 'API/RegistrationService/types'
import { RegistrationService } from 'API'
import systemSlice from 'store/slices/system'
import { RegistrationSliceState } from '../types'

const finishRegistration = createAsyncThunk(
	'registration/finishExtra',
	async (params: FinishRegistrationParams, { rejectWithValue, dispatch }) => {
		try {
			const { token } = await RegistrationService.finish(params)

			removeItemFromStorage([
				StorageKeys.REGISTRATION_DATA,
				StorageKeys.REGISTRATION_STEP
			])

			dispatch(systemSlice.actions.logIn(token))
			dispatch(systemSlice.actions.congratulationsOnRegistration())
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const finishRegistrationExtra = {
	[finishRegistration.fulfilled.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = false
	},
	[finishRegistration.pending.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[finishRegistration.rejected.type]: (
		state: RegistrationSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default finishRegistration
