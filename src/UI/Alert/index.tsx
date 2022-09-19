import React, { FC, useEffect, useState } from 'react'
import classnames from 'classnames'

import { AlertType } from './types'

import closeIconSrc from './images/closeAlert.svg'
import cl from './style.module.scss'

interface AlertProps {
	message: string
	type: AlertType
	styleTypes: AlertType[]
}

const Alert: FC<AlertProps> = ({ styleTypes = [], message, type }) => {
	const [isOpen, setIsOpen] = useState(false)

	const closeHandler = setIsOpen.bind(null, false)

	useEffect(() => {
		setIsOpen(true)
	}, [message])

	if (!isOpen) {
		return <></>
	}

	return (
		<div
			className={classnames([
				cl.alert,
				...styleTypes.map((styleType) => cl[`alert${styleType}`])
			])}
		>
			<div className={cl.alertContainer}>
				<span className={cl.header}>
					{type === AlertType.ERROR ? 'Ошибка!' : 'Успешно!'}
				</span>
				<span className={cl.desc}>{message}</span>
				<button onClick={closeHandler} className={cl.closeBtn}>
					<img src={closeIconSrc} alt="close" />
				</button>
			</div>
		</div>
	)
}

export default Alert
