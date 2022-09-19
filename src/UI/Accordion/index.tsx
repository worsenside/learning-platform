import React, { FC, useState } from 'react'
import classnames from 'classnames'

import { dropdownIconSrc } from 'components/Header/ProfileMenu/images/icons'
import cl from './style.module.scss'

interface AccordionProps {
	iconUrl: string
	label: string
	contentItemsLength?: string
	children: React.ReactNode
}

const Accordion: FC<AccordionProps> = ({
	iconUrl,
	label,
	contentItemsLength,
	children
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleHandler = setIsOpen.bind(null, (prev) => !prev)

	return (
		<div className={cl.container}>
			<div onClick={toggleHandler} className={cl.accordionToggle}>
				<div className={cl.toggleDescription}>
					<img src={iconUrl} alt="icon" />
					<span>{label}</span>
					{contentItemsLength && <span>{contentItemsLength}</span>}
				</div>
				<div className={cl.toggleIcon}>
					<img src={dropdownIconSrc} alt="dropdown" />
				</div>
			</div>
			<div
				className={classnames([cl.accordionContent], {
					[cl.accordionContentOpen]: isOpen
				})}
			>
				{children}
			</div>
		</div>
	)
}

export default Accordion
