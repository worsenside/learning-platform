import React, { FC } from 'react'

import { CountDown } from 'components'
import { Button, Link } from 'UI'
import { ButtonSizes } from 'UI/Button/types'
import { Constants } from 'types'
import { LinkStyles, LinkTextStyles, LinkTypes } from 'UI/Link/types'

import cl from 'components/Auth/style.module.scss'

interface RegistrationFormRepeatCodeProps {
	resetTimer: boolean
	setResetTimer: (_: boolean) => void
	timerIsOver: boolean
	setTimerIsOver: (_: boolean) => void
	goBack: () => void
	email?: string
	onRepeatCode: () => void
}

const RegistrationFormRepeatCode: FC<RegistrationFormRepeatCodeProps> = ({
	resetTimer,
	setResetTimer,
	timerIsOver,
	setTimerIsOver,
	goBack,
	email,
	onRepeatCode
}) => (
	<div className={cl.emailContainer}>
		<p>
			Чтобы продолжить регистрацию, перейдите по ссылке в письме, мы отправили
			его на {email}
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

export default RegistrationFormRepeatCode
