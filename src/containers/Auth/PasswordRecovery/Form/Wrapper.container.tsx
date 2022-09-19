import React, { FC, useMemo } from 'react'

import PasswordRecoveryFormWrapperComponent from 'components/Auth/PasswordRecovery/Form/Wrapper.component'
import PasswordRecoveryFormStart from 'containers/Auth/PasswordRecovery/Form/Start.container'
import PasswordRecoveryFormRepeatCode from 'containers/Auth/PasswordRecovery/Form/RepeatCode.container'
import PasswordRecoveryFormFinish from 'containers/Auth/PasswordRecovery/Form/Finish.container'
import { PasswordRecoverySteps } from './types'

interface PasswordRecoveryFormWrapperProps {
	passwordRecoveryStep: PasswordRecoverySteps
	onChangePasswordRecoveryStep: (step: PasswordRecoverySteps) => void
}

const PasswordRecoveryWrapper: FC<PasswordRecoveryFormWrapperProps> = ({
	passwordRecoveryStep,
	onChangePasswordRecoveryStep
}) => {
	const passwordRecoveryFormDescription = useMemo(() => {
		switch (passwordRecoveryStep) {
			case PasswordRecoverySteps.START_STEP:
				return 'Введите ваш электронный адрес почты, с которым вы регистрировались. На него придет ссылка для восстановления доступа к аккаунту.'
			case PasswordRecoverySteps.FINISH_STEP:
				return 'Придумайте новый пароль для доступа к вашему аккаунту.'
			default:
				return ''
		}
	}, [passwordRecoveryStep])

	const PasswordRecoveryFormContent = useMemo(() => {
		switch (passwordRecoveryStep) {
			case PasswordRecoverySteps.START_STEP:
				return PasswordRecoveryFormStart
			case PasswordRecoverySteps.REPEAT_PASSWORD_RECOVERY_CODE_STEP:
				return PasswordRecoveryFormRepeatCode
			case PasswordRecoverySteps.FINISH_STEP:
				return PasswordRecoveryFormFinish
			default:
				return PasswordRecoveryFormStart
		}
	}, [passwordRecoveryStep])

	return (
		<PasswordRecoveryFormWrapperComponent
			description={passwordRecoveryFormDescription}
		>
			<PasswordRecoveryFormContent
				onChangePasswordRecoveryStep={onChangePasswordRecoveryStep}
			/>
		</PasswordRecoveryFormWrapperComponent>
	)
}

export default PasswordRecoveryWrapper
