import React, { FC } from 'react'

import useAsideBarContext from 'contexts/AsideBar.context'
import cl from './style.module.scss'

interface AsideMenuToggleButtonProps {}

const AsideBarToggleButton: FC<AsideMenuToggleButtonProps> = () => {
	const { asideIsOpen, setAsideIsOpen } = useAsideBarContext()

	return (
		<button
			aria-label="Открыть меню"
			onClick={() => setAsideIsOpen(!asideIsOpen)}
			className={cl.burger}
		/>
	)
}

export default AsideBarToggleButton
