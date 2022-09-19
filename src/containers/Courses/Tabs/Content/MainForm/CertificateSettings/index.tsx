import React, { FC, useCallback, useState } from 'react'

import CertificateSettingsComponent from 'components/Courses/Tabs/Content/MainForm/CertificateSettings'
import {
	Control,
	FieldPath,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'
import { MainTabFormState } from '..'

export interface CertificateSettingsProps {
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	control: Control<MainTabFormState>
	watch: UseFormWatch<MainTabFormState>
	setValue: UseFormSetValue<MainTabFormState>
}

const CertificateSettings: FC<CertificateSettingsProps> = ({
	setValue,
	...props
}) => {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const openModalHandler = useCallback(setModalIsOpen.bind(null, true), [])
	const closeModalHandler = useCallback(setModalIsOpen.bind(null, false), [])
	const resetCertificateConfigsHandler = () => {
		setValue('certificateSettings.templateInfo.teacherSettings.isActive', false)
		setValue('certificateSettings.templateInfo.teacherSettings.name', '')
		setValue('certificateSettings.templateInfo.schoolSettings.isActive', false)
		setValue('certificateSettings.templateInfo.schoolSettings.schoolName', '')
		setValue('certificateSettings.templateInfo.schoolSettings.signerPost', '')
		setValue('certificateSettings.templateInfo.schoolSettings.signerName', '')
	}
	return (
		<CertificateSettingsComponent
			modalIsOpen={modalIsOpen}
			onOpenModal={openModalHandler}
			onCloseModal={closeModalHandler}
			resetCertificateConfigs={resetCertificateConfigsHandler}
			{...props}
		/>
	)
}

export default CertificateSettings
