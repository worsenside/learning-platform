import React, { FC } from 'react'

import { StartPasswordRecoveryParams } from 'API/PasswordRecoveryService/types'
import CountDown from 'components/CountDown/CountDown'
import { Button, Link } from 'UI'
import { LinkStyles, LinkTextStyles, LinkTypes } from 'UI/Link/types'
import { ButtonSizes } from 'UI/Button/types'
import { Constants } from 'types'

import cl from 'components/Auth/Authorization/style.module.scss'

interface PasswordRecoveryFormRepeatCodeProps {
	resetTimer: boolean
	setResetTimer: (value: boolean) => void
	timerIsOver: boolean
	setTimerIsOver: (value: boolean) => void
	goBack: () => void
	onRepeatCode: () => void
	email: StartPasswordRecoveryParams['email']
}

const PasswordRecoveryFormRepeatCode: FC<
	PasswordRecoveryFormRepeatCodeProps
> = ({
	timerIsOver,
	resetTimer,
	setTimerIsOver,
	setResetTimer,
	goBack,
	onRepeatCode,
	email
}) => (
	<div className={cl.emailContainer}>
		<p>
			Чтобы продолжить восстановление пароля, перейдите по ссылке в письме, мы
			отправили его на {email}
		</p>
		<p>
			Если вы не получили письмо, нажмите
			<button
				onClick={onRepeatCode}
				disabled={!timerIsOver}
				className={cl.btnSend}
			>
				«Отправить повторно»
			</button>
			через
			<CountDown
				resetTimer={resetTimer}
				setResetTimer={setResetTimer}
				timerIsOver={timerIsOver}
				setTimerIsOver={setTimerIsOver}
				minutes={0}
				seconds={Constants.REPEAT_CODE_TIMEOUT_SECONDS as number}
			/>
			или напишите нам на почту
			<Link
				type={LinkTypes.TARGET_BLANK}
				href={`mailto:${Constants.SUPPORT_EMAIL}`}
				className={cl.mailToLink}
				styleTypes={[LinkTextStyles.UNDERLINE, LinkStyles.SECONDARY]}
			>
				{Constants.SUPPORT_EMAIL}
			</Link>
		</p>
		<Button
			onClick={goBack}
			className={cl.backBtn}
			styleTypes={[ButtonSizes.WIDE]}
		>
			Вернуться назад
		</Button>
	</div>
)

export default PasswordRecoveryFormRepeatCode
