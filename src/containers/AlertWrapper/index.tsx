import React, { useEffect, useRef } from 'react'

import { useActions, useAppSelector } from 'hooks/redux'
import { Alert } from 'UI'
import { AlertType } from 'UI/Alert/types'
import { ErrorElement } from 'store/slices/system/types'

const AlertWrapper = () => {
	const { errorElementsList } = useAppSelector((state) => state.system)
	const oldErrorElementsList = useRef<ErrorElement[]>([])
	const { clearError } = useActions((state) => state.system)
	useEffect(() => {
		const newError = errorElementsList.find(
			(errorElement) =>
				!oldErrorElementsList.current.some(
					(oldErrorElement) => oldErrorElement.id === errorElement.id
				)
		)
		if (!newError) {
			return
		}
		setTimeout(() => {
			clearError(newError.id)
		}, 2000)
		oldErrorElementsList.current = errorElementsList
	}, [errorElementsList])

	return (
		<>
			{errorElementsList.map((error) => (
				<Alert
					key={error.id}
					message={error.message}
					type={AlertType.ERROR}
					styleTypes={[AlertType.ERROR]}
				/>
			))}
		</>
	)
}

export default AlertWrapper
