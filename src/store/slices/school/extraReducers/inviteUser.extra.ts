import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import systemSlice from 'store/slices/system'
import { InviteUserParams } from 'API/SchoolService/types'
import { SchoolService } from 'API'
import { SchoolSliceState } from '../types'

const inviteUser = createAsyncThunk(
	'school/inviteUserExtra',
	async (params: InviteUserParams, { rejectWithValue, dispatch }) => {
		try {
			await SchoolService.inviteUser(params)
		} catch ({ message }) {
			dispatch(systemSlice.actions.pushError({ message: message as string }))

			return rejectWithValue({ message })
		}
	}
)

export const inviteUserExtra = {
	[inviteUser.fulfilled.type]: (state: SchoolSliceState) => {
		state.meta.isLoading = false
	},
	[inviteUser.pending.type]: (state: SchoolSliceState) => {
		state.meta.isLoading = true
		state.meta.error = ''
	},
	[inviteUser.rejected.type]: (
		state: SchoolSliceState,
		action: PayloadAction<string>
	) => {
		state.meta.isLoading = false
		state.meta.error = action.payload
	}
}

export default inviteUser
