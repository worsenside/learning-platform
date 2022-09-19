import React, { FC } from 'react'

import { CertificateSettingsProps } from 'components/Courses/Tabs/Content/MainForm/CertificateSettings'
import ConfigModalComponent from 'components/Courses/Tabs/Content/MainForm/CertificateSettings/modals/Config'

export interface ConfigModalProps extends CertificateSettingsProps {}

const ConfigModal: FC<ConfigModalProps> = (props) => (
	<ConfigModalComponent {...props} />
)

export default ConfigModal
