import React, { FC } from 'react'

import { Link } from 'UI'
import { LinkStyles, LinkTextStyles, LinkTypes } from 'UI/Link/types'
import useAsideBarContext from 'contexts/AsideBar.context'
import { AsideBarOption } from './types'
import cl from './style.module.scss'

interface AsideBarOptionProps extends AsideBarOption {}

const AsideBarOptionsItem: FC<AsideBarOptionProps> = ({
	labelText,
	link,
	icon
}) => {
	const { asideIsOpen, asideOnToggle } = useAsideBarContext()

	return (
		<li onClick={asideOnToggle}>
			<Link
				type={LinkTypes.ASIDE}
				styleTypes={[LinkStyles.ASIDE, LinkTextStyles.MEDIUM]}
				href={link}
			>
				<div className={cl.iconContainer}>{icon}</div>
				{asideIsOpen && labelText}
			</Link>
		</li>
	)
}

export default AsideBarOptionsItem
