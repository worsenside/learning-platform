import { createSlice } from '@reduxjs/toolkit'

import { authorizeExtra, refreshTokenExtra } from './extraReducers/extra'
import { AuthorizationSliceState } from './types'

const initialState: AuthorizationSliceState = {
	meta: {
		isLoading: false,
		error: ''
	}
}

const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {},
	extraReducers: {
		...authorizeExtra,
		...refreshTokenExtra
	}
})

export default authorizationSlice
