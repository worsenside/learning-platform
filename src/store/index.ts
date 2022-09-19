import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
	systemSlice,
	registrationSlice,
	passwordRecoverySlice,
	authorizationSlice,
	lessonSlice,
	taskSlice
} from './slices'
import { userQuery, schoolQuery, courseQuery } from './queries'

const slicesReducers = {
	[systemSlice.name]: systemSlice.reducer,
	[registrationSlice.name]: registrationSlice.reducer,
	[passwordRecoverySlice.name]: passwordRecoverySlice.reducer,
	[authorizationSlice.name]: authorizationSlice.reducer,
	[lessonSlice.name]: lessonSlice.reducer,
	[taskSlice.name]: taskSlice.reducer
}

const queriesReducers = {
	[userQuery.reducerPath]: userQuery.reducer,
	[schoolQuery.reducerPath]: schoolQuery.reducer,
	[courseQuery.reducerPath]: courseQuery.reducer
}

const rootReducer = combineReducers({
	...slicesReducers,
	...queriesReducers
})

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				userQuery.middleware,
				schoolQuery.middleware,
				courseQuery.middleware
			)
	})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
