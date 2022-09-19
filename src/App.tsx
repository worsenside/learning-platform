import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { useCheckAuth } from 'hooks'
import { Loader } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'
import { useAppSelector } from './hooks/redux'
import { GuestRoutes, SchoolAdminRoutes } from './routes'

const App: FC = () => {
	useCheckAuth()
	const { isAuth, isLoading } = useAppSelector((state) => state.system)

	if (isLoading) {
		return <Loader styleTypes={[LoaderStyles.BIG]} />
	}

	return (
		<BrowserRouter>
			{isAuth ? <SchoolAdminRoutes /> : <GuestRoutes />}
		</BrowserRouter>
	)
}

export default App
