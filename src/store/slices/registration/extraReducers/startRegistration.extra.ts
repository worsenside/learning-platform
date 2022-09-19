import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { saveItemToStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { StartRegistrationParams } from 'API/RegistrationService/types'
import { RegistrationService } from 'API'
import systemSlice from 'store/slices/system'
import { RegistrationSliceState } from '../types'

const startRegistration = createAsyncThunk(
	'registration/startExtra',
	async (params: StartRegistrationParams, { rejectWithValue, dispatch }) => {
		try {
			const { userId } = await RegistrationService.start(params)

			return { userId, email: params.email }
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const startRegistrationExtra = {
	[startRegistration.fulfilled.type]: (
		state: RegistrationSliceState,
		{ payload }: PayloadAction<Pick<RegistrationSliceState, 'userId' | 'email'>>
	) => {
		state.meta.isLoading = false

		state.userId = payload.userId
		state.email = payload.email

		saveItemToStorage([StorageKeys.REGISTRATION_DATA, payload])
	},
	[startRegistration.pending.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[startRegistration.rejected.type]: (
		state: RegistrationSliceState,
		{ payload }: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = payload
	}
}

export default startRegistration
