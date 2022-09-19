import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { removeItemFromStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { BreakRegistrationParams } from 'API/RegistrationService/types'
import { RegistrationService } from 'API'
import systemSlice from 'store/slices/system'
import { RegistrationSliceState } from '../types'

const breakRegistration = createAsyncThunk(
	'registration/breakExtra',
	async (params: BreakRegistrationParams, { rejectWithValue }) => {
		try {
			await RegistrationService.break(params)
		} catch ({ message }) {
			return rejectWithValue({ message })
		}
	}
)

export const breakRegistrationExtra = {
	[breakRegistration.fulfilled.type]: () => {
		removeItemFromStorage([
			StorageKeys.REGISTRATION_DATA,
			StorageKeys.REGISTRATION_STEP
		])
		// TODO Check working
		return {
			meta: {
				isLoading: false,
				error: ''
			},
			registrationCode: '',
			email: ''
		}
	},
	[breakRegistration.pending.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[breakRegistration.rejected.type]: (
		state: RegistrationSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default breakRegistration
