import React, { FC } from 'react'

import { useMatchMedia } from 'hooks'

import { Logo } from 'UI'
import { ProfileMenu, NotificationsBar } from 'containers/Header'
import { AsideBarToggleButton } from 'components/AsideBar/AsideBarToggleButton'

import cl from './style.module.scss'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
	const { isMobile } = useMatchMedia()

	return (
		<header className={cl.header}>
			<div className={cl.burgerMenu}>
				<AsideBarToggleButton />
				<Logo />
			</div>
			<div className={cl.optionsMenu}>
				{!isMobile && <NotificationsBar />}
				<ProfileMenu />
			</div>
		</header>
	)
}

export default Header
