import React, { FC, useCallback, useState } from 'react'

import { useActions, useAppSelector } from 'hooks/redux'
import { removeItemFromStorage } from 'helpers/storage'

import PasswordRecoveryFormRepeatCodeComponent from 'components/Auth/PasswordRecovery/Form/RepeatCode.component'
import { StorageKeys } from 'types'
import { PasswordRecoverySteps, PasswordRecoveryFormBaseProps } from './types'

interface PasswordRecoveryFormRepeatCodeProps
	extends PasswordRecoveryFormBaseProps {}

const PasswordRecoveryFormRepeatCode: FC<
	PasswordRecoveryFormRepeatCodeProps
> = ({ onChangePasswordRecoveryStep }) => {
	const [timerIsOver, setTimerIsOver] = useState(false)
	const [resetTimer, setResetTimer] = useState(false)

	const { startPasswordRecovery } = useActions(
		(state) => state.passwordRecovery
	)
	const { meta, email } = useAppSelector((state) => state.passwordRecovery)

	const repeatCodeHandler = useCallback(() => {
		setResetTimer(true)
		setTimerIsOver(false)
		startPasswordRecovery({ email })
	}, [])

	const goBackHandler = useCallback(() => {
		onChangePasswordRecoveryStep(PasswordRecoverySteps.START_STEP)
		removeItemFromStorage([StorageKeys.PASSWORD_RECOVERY_DATA])
	}, [])

	return (
		<PasswordRecoveryFormRepeatCodeComponent
			timerIsOver={timerIsOver}
			resetTimer={resetTimer}
			setResetTimer={setResetTimer}
			setTimerIsOver={setTimerIsOver}
			onRepeatCode={repeatCodeHandler}
			goBack={goBackHandler}
			email={email}
		/>
	)
}

export default PasswordRecoveryFormRepeatCode
