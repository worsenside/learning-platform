import { useEffect } from 'react'

import { userQuery } from 'store/queries'
import { useActions, useAppSelector } from './redux'

const useCheckAuth = () => {
	const { logIn, finishCheckAuthorization } = useActions(
		(state) => state.system
	)
	const { refreshToken } = useActions((state) => state.authorization)
	const { token, isAuth } = useAppSelector((state) => state.system)

	const { isSuccess, isLoading } = userQuery.useGetYourselfQuery(token)

	useEffect(() => {
		if (isLoading || isAuth) {
			return
		}
		try {
			if (!isSuccess) {
				return
			}

			logIn()
			refreshToken()
		} finally {
			finishCheckAuthorization()
		}
	}, [isSuccess, isLoading, isAuth])
}

export default useCheckAuth
