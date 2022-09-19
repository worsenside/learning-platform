import React, { FC } from 'react'
import { Button, RadioGroup, Switch } from 'UI'
import { ButtonStyles } from 'UI/Button/types'

import { CertificateTypes } from 'types/models/course.model/settings/certificate.model'
import { CertificateSettingsProps as CertificateSettingsContainerProps } from 'containers/Courses/Tabs/Content/MainForm/CertificateSettings'
import ConfigModal from 'containers/Courses/Tabs/Content/MainForm/CertificateSettings/modals/Config'

import cl from './style.module.scss'

export interface CertificateSettingsProps
	extends Omit<CertificateSettingsContainerProps, 'setValue'> {
	modalIsOpen: boolean
	onCloseModal: () => void
	onOpenModal: () => void
	resetCertificateConfigs: () => void
}

const CertificateSettings: FC<CertificateSettingsProps> = ({
	control,
	watch,
	onChange,
	modalIsOpen,
	onCloseModal,
	onOpenModal,
	resetCertificateConfigs
}) => (
	<>
		<Switch
			name="certificateSettings.isActive"
			id="certificateSettings.isActive"
			onChange={onChange('certificateSettings.isActive')}
			control={control}
			labelTitle="Выдавать сертификат ученикам по завершению курса."
		/>
		<RadioGroup
			name="certificateSettings.type"
			disabled={!watch('certificateSettings.isActive')}
			itemsList={[
				{
					value: CertificateTypes.DEFAULT,
					labelTitle: 'Сертификат от "Учебной платформы'
				},
				{ value: CertificateTypes.CUSTOM, labelTitle: 'Свой сертификат' }
			]}
			onChange={onChange('certificateSettings.type')}
			control={control}
		/>
		<div className={cl.buttonsContainer}>
			<Button
				disabled={
					watch('certificateSettings.type') !== CertificateTypes.CUSTOM ||
					!watch('certificateSettings.isActive')
				}
				onClick={onOpenModal}
				styleTypes={[ButtonStyles.OUTLINE_PRIMARY, ButtonStyles.ROUND]}
			>
				Настроить
			</Button>
			<Button styleTypes={[ButtonStyles.OUTLINE_DARK, ButtonStyles.ROUND]}>
				Посмотреть шаблон
			</Button>
		</div>
		<ConfigModal
			resetCertificateConfigs={resetCertificateConfigs}
			control={control}
			modalIsOpen={modalIsOpen}
			onOpenModal={onOpenModal}
			onCloseModal={onCloseModal}
			onChange={onChange}
			watch={watch}
		/>
	</>
)

export default CertificateSettings
