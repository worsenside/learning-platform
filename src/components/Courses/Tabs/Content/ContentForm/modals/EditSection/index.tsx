import React, { FC } from 'react'
import { Button, Modal, TextInput } from 'UI'
import { ModalSize } from 'UI/Modal/types'
import { ButtonStyles } from 'UI/Button/types'

import {
	EditSectionModalProps as EditSectionModalContainerProps,
	SectionFormState
} from 'containers/Courses/Tabs/Content/ContentForm/modals/EditSection'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'
import cl from '../CreateSection/style.module.scss'

interface EditSectionModalProps extends EditSectionModalContainerProps {
	control: Control<SectionFormState>
	onChange: (name: FieldPath<SectionFormState>) => (value: string) => void
	errors: FieldErrors<SectionFormState>
	onSubmit: () => void
}

const EditSectionModal: FC<EditSectionModalProps> = ({
	isModalOpen,
	closeModal,
	control,
	errors,
	onSubmit,
	onChange
}) => (
	<Modal
		title="Редактирование раздела"
		description="Укажите название раздела."
		isOpen={isModalOpen}
		onClose={closeModal}
		styleTypes={[ModalSize.SMALL]}
	>
		<form noValidate onSubmit={onSubmit} className={cl.formContainer}>
			<TextInput
				error={errors.name?.message}
				id="name"
				onChange={onChange('name')}
				control={control}
				name="name"
				placeholder="Название раздела"
			/>
			<div className={cl.buttonsContainer}>
				<Button
					onClick={closeModal}
					styleTypes={[ButtonStyles.DECLINE_PRIMARY, ButtonStyles.ROUND]}
				>
					Отмена
				</Button>
				<Button
					type="submit"
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					Сохранить
				</Button>
			</div>
		</form>
	</Modal>
)

export default EditSectionModal
