import { createSlice } from '@reduxjs/toolkit'

import { changePasswordExtra } from './extraReducers/extra'
import { UserSliceState } from './types'

const initialState: UserSliceState = {
	meta: {
		isLoading: false,
		error: ''
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		...changePasswordExtra
	}
})

export default userSlice
