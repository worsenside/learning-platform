import { createSlice } from '@reduxjs/toolkit'

import { inviteUserExtra } from './extraReducers/extra'
import { SchoolSliceState } from './types'

const initialState: SchoolSliceState = {
	meta: {
		isLoading: false,
		error: ''
	}
}

const schoolSlice = createSlice({
	name: 'school',
	initialState,
	reducers: {},
	extraReducers: {
		...inviteUserExtra
	}
})

export default schoolSlice
