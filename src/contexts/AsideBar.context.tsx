import { createContext, useContext } from 'react'

export interface AsideBarContent {
	asideIsOpen: boolean
	setAsideIsOpen: (value: boolean) => void
	asideOnToggle: () => void
}

export const AsideBarContext = createContext<AsideBarContent>({
	asideIsOpen: true,
	setAsideIsOpen: () => {},
	asideOnToggle: () => {}
})

const useAsideBarContext = () => useContext(AsideBarContext)

export default useAsideBarContext
