import React, { FC } from 'react'

import { Button, Modal } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import { ModalHeight, ModalSize } from 'UI/Modal/types'

import cl from '../style.module.scss'

interface ConfirmDeleteUserModalProps {
	isOpen: boolean
	userName: string
	onClose: () => void
	onDelete: () => void
}

const ConfirmDeleteUserModal: FC<ConfirmDeleteUserModalProps> = ({
	isOpen,
	userName,
	onClose,
	onDelete
}) => (
	<Modal
		styleTypes={[ModalSize.BIG, ModalHeight.SMALL]}
		title="Удалить пользователя?"
		description={`Вы действительно хотите удалить пользователя ${userName}?`}
		isOpen={isOpen}
		onClose={onClose}
	>
		<div className={cl.buttonsContainer}>
			<Button
				onClick={onClose}
				styleTypes={[ButtonStyles.OUTLINE_DARK, ButtonStyles.ROUND]}
			>
				Отмена
			</Button>
			<Button
				onClick={onDelete}
				styleTypes={[ButtonStyles.DANGER, ButtonStyles.ROUND]}
			>
				Удалить
			</Button>
		</div>
	</Modal>
)

export default ConfirmDeleteUserModal
