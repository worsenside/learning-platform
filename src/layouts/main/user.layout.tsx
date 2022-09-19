import React, { FC, useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import classnames from 'classnames'

import { useMatchMedia } from 'hooks'

import { Header } from 'containers/Header'
import { AsideBarContext } from 'contexts/AsideBar.context'
import { AsideBar } from 'containers/AsideBar'
import { ThanksForRegistrationModal } from 'components/Auth/modals'
import { useAppSelector } from 'hooks/redux'
import AlertWrapper from 'containers/AlertWrapper'

import cl from './style.module.scss'

const UserLayout: FC = () => {
	const [asideIsOpen, setAsideIsOpen] = useState(true)
	const { haveRegistrationCongratulations } = useAppSelector(
		(state) => state.system
	)
	const { isMobile } = useMatchMedia()

	const containerStyles = classnames(cl.userContainer, [
		{
			[cl.asideIsOpen]: asideIsOpen && !isMobile
		}
	])

	const asideToggleHandler = useCallback(() => {
		if (!isMobile) {
			return
		}

		setAsideIsOpen(false)
	}, [isMobile])

	return (
		<>
			<AlertWrapper />
			<AsideBarContext.Provider
				value={{
					setAsideIsOpen,
					asideIsOpen,
					asideOnToggle: asideToggleHandler
				}}
			>
				<Header />
				<div className={containerStyles}>
					<AsideBar />
					<Outlet />
				</div>
			</AsideBarContext.Provider>
			<ThanksForRegistrationModal isOpen={haveRegistrationCongratulations} />
		</>
	)
}

export default UserLayout
