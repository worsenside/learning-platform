import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { AuthorizationService } from 'API'
import { saveItemToStorage } from 'helpers/storage'
import { StorageKeys } from 'types'
import { AuthorizationSliceState } from '../types'

const refreshToken = createAsyncThunk(
	'authorization/refreshTokenExtra',
	async (_, { rejectWithValue }) => {
		try {
			const { token } = await AuthorizationService.refreshToken()

			saveItemToStorage([StorageKeys.TOKEN, token])
		} catch ({ message }) {
			return rejectWithValue({ message })
		}
	}
)

export const refreshTokenExtra = {
	[refreshToken.fulfilled.type]: (state: AuthorizationSliceState) => {
		state.meta.isLoading = false
	},
	[refreshToken.pending.type]: (state: AuthorizationSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[refreshToken.rejected.type]: (
		state: AuthorizationSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default refreshToken
