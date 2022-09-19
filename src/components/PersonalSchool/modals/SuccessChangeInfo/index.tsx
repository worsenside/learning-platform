import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Modal } from 'UI'
import { ModalHeight, ModalSize } from 'UI/Modal/types'
import { ButtonStyles } from 'UI/Button/types'

import cl from '../style.module.scss'

interface SuccessChangeInfoModalProps {
	isOpen: boolean
	onClose: () => void
}

const SuccessChangeInfoModal: FC<SuccessChangeInfoModalProps> = ({
	isOpen,
	onClose
}) => {
	const navigate = useNavigate()

	return (
		<Modal
			styleTypes={[ModalSize.BIG, ModalHeight.SMALL]}
			isOpen={isOpen}
			onClose={onClose}
			title="Настройки школы сохранены"
			description="Изменения успешно сохранены."
		>
			<div className={cl.buttonsContainer}>
				<Button
					onClick={() => navigate('/profile/user')}
					styleTypes={[ButtonStyles.OUTLINE_DARK, ButtonStyles.ROUND]}
				>
					Перейти в настройки профлия
				</Button>
				<Button
					onClick={() => navigate('/')}
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					Перейти в курсы
				</Button>
			</div>
		</Modal>
	)
}

export default SuccessChangeInfoModal
