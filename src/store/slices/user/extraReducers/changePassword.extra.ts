import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import systemSlice from 'store/slices/system'
import { UserService } from 'API'
import { ChangePasswordParams } from 'API/UserService/types'
import { UserSliceState } from '../types'

const changePassword = createAsyncThunk(
	'user/changePasswordExtra',
	async (params: ChangePasswordParams, { rejectWithValue, dispatch }) => {
		try {
			await UserService.changePassword(params)
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const changePasswordExtra = {
	[changePassword.fulfilled.type]: (state: UserSliceState) => {
		state.meta.isLoading = false
	},
	[changePassword.pending.type]: (state: UserSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[changePassword.rejected.type]: (
		state: UserSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default changePassword
