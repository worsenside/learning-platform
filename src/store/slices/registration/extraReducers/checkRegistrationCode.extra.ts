import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { getItemFromStorage, saveItemToStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { CheckRegistrationCodeParams } from 'API/RegistrationService/types'
import { RegistrationService } from 'API'
import systemSlice from 'store/slices/system'
import { RegistrationSliceState } from '../types'

const checkRegistrationCode = createAsyncThunk(
	'registration/checkCodeExtra',
	async (
		params: CheckRegistrationCodeParams,
		{ rejectWithValue, dispatch }
	) => {
		try {
			await RegistrationService.checkCode(params)

			return params
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const checkRegistrationCodeExtra = {
	[checkRegistrationCode.fulfilled.type]: (
		state: RegistrationSliceState,
		{
			payload
		}: PayloadAction<
			Pick<RegistrationSliceState, 'userId' | 'registrationCode'>
		>
	) => {
		state.meta.isLoading = false

		saveItemToStorage([
			StorageKeys.REGISTRATION_DATA,
			{ ...getItemFromStorage(StorageKeys.REGISTRATION_DATA, {}), ...payload }
		])
		state.registrationCode = payload.registrationCode
		state.userId = payload.userId
	},
	[checkRegistrationCode.pending.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[checkRegistrationCode.rejected.type]: (
		state: RegistrationSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default checkRegistrationCode
