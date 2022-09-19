import React, { FC } from 'react'
import classnames from 'classnames'

import useAsideBarContext from 'contexts/AsideBar.context'
import { AsideBarOption } from './types'
import AsideBarOptionsItem from './AsideBarOptionsItem'

import cl from './style.module.scss'

interface AsideBarListProps {
	asideBarOptionsList: AsideBarOption[]
}

const AsideBarOptions: FC<AsideBarListProps> = ({ asideBarOptionsList }) => {
	const { asideIsOpen } = useAsideBarContext()
	const asideStyles = classnames(cl.container, {
		[cl.open]: asideIsOpen
	})

	return (
		<aside className={asideStyles}>
			<ul className={cl.options}>
				{asideBarOptionsList.map((asideBarOptionsListItem) => (
					<AsideBarOptionsItem
						key={asideBarOptionsListItem.id}
						{...asideBarOptionsListItem}
					/>
				))}
			</ul>
		</aside>
	)
}

export default AsideBarOptions
