import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import systemSlice from 'store/slices/system'
import { AuthorizeParams } from 'API/AuthorizationService/types'
import { AuthorizationService } from 'API'
import { AuthorizationSliceState } from '../types'

const authorize = createAsyncThunk(
	'authorization/authorizeExtra',
	async (params: AuthorizeParams, { rejectWithValue, dispatch }) => {
		try {
			const { token } = await AuthorizationService.authorize(params)

			dispatch(systemSlice.actions.logIn(token))
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const authorizeExtra = {
	[authorize.fulfilled.type]: (state: AuthorizationSliceState) => {
		state.meta.isLoading = false
	},
	[authorize.pending.type]: (state: AuthorizationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[authorize.rejected.type]: (
		state: AuthorizationSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default authorize
