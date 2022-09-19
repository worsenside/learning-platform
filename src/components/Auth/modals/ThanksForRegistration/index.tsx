import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Modal } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import { ModalHeight, ModalSize } from 'UI/Modal/types'

import { useActions } from 'hooks/redux'
import cl from '../style.module.scss'

interface ThanksForRegistrationModalProps {
	isOpen: boolean
}

const ThanksForRegistrationModal: FC<ThanksForRegistrationModalProps> = ({
	isOpen
}) => {
	const navigate = useNavigate()
	const { breakCongratulationsOnRegistration } = useActions(
		(state) => state.system
	)
	return (
		<Modal
			styleTypes={[ModalSize.BIG, ModalHeight.SMALL]}
			title="Вы успешно зарегистрировались!"
			description="Спасибо! Теперь заполните данные школы (профиля) или перейдите к созданию курса."
			isOpen={isOpen}
		>
			<div className={cl.buttonsContainer}>
				<Button
					onClick={() => {
						breakCongratulationsOnRegistration()
						navigate('/profile/user')
					}}
					styleTypes={[ButtonStyles.OUTLINE_DARK, ButtonStyles.ROUND]}
				>
					Заполнить данные профиля
				</Button>
				<Button
					onClick={() => {
						breakCongratulationsOnRegistration()
						navigate('/profile/school')
					}}
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					Заполнить данные школы
				</Button>
			</div>
		</Modal>
	)
}

export default ThanksForRegistrationModal
