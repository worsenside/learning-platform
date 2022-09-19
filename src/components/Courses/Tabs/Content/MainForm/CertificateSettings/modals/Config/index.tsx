import React, { FC } from 'react'
import { ConfigModalProps as ConfigModalContainerProps } from 'containers/Courses/Tabs/Content/MainForm/CertificateSettings/modals/Config'
import { Button, Checkbox, Modal, TextInput } from 'UI'
import { ModalSize } from 'UI/Modal/types'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'

import cl from './style.module.scss'

interface ConfigModalProps extends ConfigModalContainerProps {}

const ConfigModal: FC<ConfigModalProps> = ({
	modalIsOpen,
	onCloseModal,
	onChange,
	control,
	watch,
	resetCertificateConfigs
}) => (
	<Modal
		onClose={onCloseModal}
		styleTypes={[ModalSize.BIG]}
		description="Загрузите данные сертификата"
		isOpen={modalIsOpen}
		title="Настройка сертификата"
	>
		<div className={cl.inputs}>
			<div className={cl.inputContainer}>
				<label htmlFor="certificateSettings.templateInfo.teacherSettings.isActive">
					Преподаватель
				</label>
				<Checkbox
					id="certificateSettings.templateInfo.teacherSettings.isActive"
					onChange={onChange(
						'certificateSettings.templateInfo.teacherSettings.isActive'
					)}
					name="certificateSettings.templateInfo.teacherSettings.isActive"
					control={control}
					labelTitle="Настроить отображение преподавателя"
				/>
				<p className={cl.caption}>
					Если оставить поле вводу пустым, преподаватель не будет показан на
					сертификате
				</p>
				<TextInput
					onChange={onChange(
						'certificateSettings.templateInfo.teacherSettings.name'
					)}
					control={control}
					disabled={
						!watch('certificateSettings.templateInfo.teacherSettings.isActive')
					}
					name="certificateSettings.templateInfo.teacherSettings.name"
					placeholder="Виктор Степанов"
				/>
			</div>
			{/* TODO закончить */}
			<div className={cl.inputContainer}>
				<label>Логотип школы</label>
				<p className={cl.caption}>
					Мы используем лого из настроек профиля школы. Чтобы настроить лого
					перейдите в настройки школы.
				</p>
				<Button
					styleTypes={[
						ButtonStyles.OUTLINE_DARK,
						ButtonStyles.ROUND,
						ButtonSizes.UNSET
					]}
				>
					Посмотреть текущий логотип
				</Button>
			</div>
			<div className={cl.inputContainer}>
				<label htmlFor="certificateSettings.templateInfo.schoolSettings.isActive">
					Настройки школы
				</label>
				<Checkbox
					onChange={onChange(
						'certificateSettings.templateInfo.schoolSettings.isActive'
					)}
					name="certificateSettings.templateInfo.schoolSettings.isActive"
					control={control}
					labelTitle="Настроить отображение школы"
				/>
				<TextInput
					disabled={
						!watch('certificateSettings.templateInfo.schoolSettings.isActive')
					}
					onChange={onChange(
						'certificateSettings.templateInfo.schoolSettings.schoolName'
					)}
					control={control}
					name="certificateSettings.templateInfo.schoolSettings.schoolName"
					placeholder="Название школы"
				/>
				<TextInput
					disabled={
						!watch('certificateSettings.templateInfo.schoolSettings.isActive')
					}
					onChange={onChange(
						'certificateSettings.templateInfo.schoolSettings.signerPost'
					)}
					control={control}
					name="certificateSettings.templateInfo.schoolSettings.signerPost"
					placeholder="Должность подписанта"
				/>
				<TextInput
					disabled={
						!watch('certificateSettings.templateInfo.schoolSettings.isActive')
					}
					onChange={onChange(
						'certificateSettings.templateInfo.schoolSettings.signerName'
					)}
					control={control}
					name="certificateSettings.templateInfo.schoolSettings.signerName"
					placeholder="Подписант"
				/>
			</div>
			<div className={cl.buttonsActions}>
				<Button
					onClick={resetCertificateConfigs}
					styleTypes={[ButtonStyles.OUTLINE_DARK, ButtonStyles.ROUND]}
				>
					Сбросить настройки
				</Button>
				{/* TODO предпросмотр сделать */}
				<Button styleTypes={[ButtonStyles.OUTLINE_PRIMARY, ButtonStyles.ROUND]}>
					Предпросмотр
				</Button>
			</div>
			<div className={cl.splitLine} />
			<div className={cl.buttonsFooter}>
				<Button
					onClick={() => {
						resetCertificateConfigs()
						onCloseModal()
					}}
					styleTypes={[ButtonStyles.DECLINE_PRIMARY, ButtonStyles.ROUND]}
				>
					Отмена
				</Button>
				<Button
					onClick={onCloseModal}
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					Сохранить изменения
				</Button>
			</div>
		</div>
	</Modal>
)

export default ConfigModal
