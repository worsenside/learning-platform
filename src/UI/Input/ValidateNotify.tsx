import React, { FC } from 'react'
import classnames from 'classnames'

import cl from './style.module.scss'

export interface ValidateNotifyProps {
	error?: string
	className?: string
}

const ValidateNotify: FC<ValidateNotifyProps> = ({ error, className }) =>
	error ? (
		<div className={classnames([cl.validateNotify, className])}>
			<span>{error}</span>
		</div>
	) : (
		<></>
	)

export default ValidateNotify
