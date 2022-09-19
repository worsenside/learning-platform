import React, { FC } from 'react'

import TextInput from './TextInput'
import { TextInputProps } from './types'

interface EmailInputProps extends TextInputProps {}

const EmailInput: FC<EmailInputProps> = (props) => (
	<TextInput type="email" placeholder="Электронная почта" {...props} />
)

export default EmailInput
