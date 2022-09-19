import React, { FC, useCallback, useState } from 'react'

import { useActions, useAppSelector } from 'hooks/redux'

import RegistrationFormRepeatCodeComponent from 'components/Auth/Registration/Form/RepeatCode.component'
import {
	RegistrationFormBaseProps,
	RegistrationSteps
} from 'containers/Auth/Registration/Form/types'

interface RegistrationFormEmailProps extends RegistrationFormBaseProps {}

const RegistrationFormEmail: FC<RegistrationFormEmailProps> = ({
	onChangeRegistrationStep
}) => {
	const [timerIsOver, setTimerIsOver] = useState(false)
	const [resetTimer, setResetTimer] = useState(false)

	const { breakRegistration, repeatRegistrationCode } = useActions(
		(state) => state.registration
	)
	const { email, userId } = useAppSelector((state) => state.registration)

	const goBackHandler = useCallback(() => {
		breakRegistration({ email })

		onChangeRegistrationStep(RegistrationSteps.CHOOSE_SCHOOL_ROLE_STEP)
	}, [])

	const repeatCodeHandler = useCallback(() => {
		if (!userId) {
			return
		}
		setResetTimer(true)
		setTimerIsOver(false)
		repeatRegistrationCode({ userId })
	}, [])

	return (
		<RegistrationFormRepeatCodeComponent
			email={email}
			timerIsOver={timerIsOver}
			resetTimer={resetTimer}
			setResetTimer={setResetTimer}
			setTimerIsOver={setTimerIsOver}
			onRepeatCode={repeatCodeHandler}
			goBack={goBackHandler}
		/>
	)
}

export default RegistrationFormEmail
