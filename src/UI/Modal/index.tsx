import React, { FC, useRef } from 'react'
import classnames from 'classnames'

import { useDisableWindowScroll, useOnClickOutside } from 'hooks'

import { ModalHeight, ModalSize } from './types'

import cl from './style.module.scss'

interface ModalProps {
	title: string
	isOpen: boolean
	styleTypes: (ModalHeight | ModalSize)[]
	description?: string
	onClose?: () => void
}

const Modal: FC<ModalProps> = ({
	title,
	isOpen,
	onClose,
	styleTypes = [],
	description,
	children
}) => {
	const modalContentRef = useRef(null)

	const modalClasses = classnames(
		[cl.modal, ...styleTypes.map((styleType) => cl[`modal${styleType}`])],
		{
			[cl.modalIsOpen]: isOpen
		}
	)

	const modalContentClasses = classnames([
		cl.modalContent,
		...styleTypes.map((styleType) => cl[`modalContent${styleType}`])
	])

	const clickOutsideHandler = () => onClose?.()
	useOnClickOutside<HTMLDivElement>(modalContentRef, clickOutsideHandler)
	useDisableWindowScroll(isOpen)

	return (
		<div className={modalClasses}>
			<div className={cl.modalContainer}>
				<div ref={modalContentRef} className={modalContentClasses}>
					<div>
						<div className={cl.modalHeader}>
							<h2>{title}</h2>
							{onClose && (
								<button
									className={cl.modalExit}
									aria-label="Закрыть модальное окно"
									onClick={onClose}
								/>
							)}
						</div>
						{description && (
							<div className={cl.modalDescription}>
								<p>{description}</p>
							</div>
						)}
					</div>
					<div className={cl.modalBody}>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
