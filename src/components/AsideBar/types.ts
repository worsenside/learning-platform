import React from 'react'

export interface AsideBarOption {
	id: number | string
	labelText: string
	link: string
	icon: React.ReactNode
}

export interface AsideBarProps {
	asideBarOptionsList: AsideBarOption[]
}
