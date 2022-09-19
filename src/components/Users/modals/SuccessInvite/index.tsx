import React, { FC } from 'react'

import { Button, Modal } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import { ModalHeight, ModalSize } from 'UI/Modal/types'

import cl from '../style.module.scss'

interface SuccessInviteModalProps {
	isOpen: boolean
	email: string
	onClose: () => void
	openInviteModal: () => void
}

const SuccessInviteModal: FC<SuccessInviteModalProps> = ({
	isOpen,
	email,
	onClose,
	openInviteModal
}) => (
	<Modal
		styleTypes={[ModalSize.BIG, ModalHeight.SMALL]}
		title="Приглашение отправлено"
		description={`Приглашение пользователю успешно отправлено на почту ${email}`}
		onClose={onClose}
		isOpen={isOpen}
	>
		<div className={cl.buttonsContainer}>
			<Button
				onClick={() => {
					openInviteModal()
					onClose()
				}}
				styleTypes={[ButtonStyles.DARK, ButtonStyles.ROUND]}
			>
				Пригласить другого ученика
			</Button>
		</div>
	</Modal>
)

export default SuccessInviteModal
