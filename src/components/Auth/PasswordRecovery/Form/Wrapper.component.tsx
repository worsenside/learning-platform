import React, { FC } from 'react'

import cl from 'pages/Auth/style.module.scss'

interface PasswordRecoveryWrapperProps {
	description: string
}

const PasswordRecoveryFormWrapper: FC<PasswordRecoveryWrapperProps> = ({
	description,
	children
}) => (
	<div className={cl.body}>
		<h1>Восстановление пароля</h1>
		<p className={cl.recoveryDesc}>{description}</p>
		{children}
	</div>
)

export default PasswordRecoveryFormWrapper
