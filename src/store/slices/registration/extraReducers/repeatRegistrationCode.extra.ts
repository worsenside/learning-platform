import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { RepeatRegistrationCodeParams } from 'API/RegistrationService/types'
import { RegistrationService } from 'API'
import systemSlice from 'store/slices/system'
import { RegistrationSliceState } from '../types'

const repeatRegistrationCode = createAsyncThunk(
	'registration/repeatCodeExtra',
	async (
		params: RepeatRegistrationCodeParams,
		{ rejectWithValue, dispatch }
	) => {
		try {
			await RegistrationService.repeatCode(params)
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const repeatRegistrationCodeExtra = {
	[repeatRegistrationCode.fulfilled.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = false
	},
	[repeatRegistrationCode.pending.type]: (state: RegistrationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[repeatRegistrationCode.rejected.type]: (
		state: RegistrationSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default repeatRegistrationCode
