import React, { FC, LinkHTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import { LinkSizes, LinkStyles, LinkTextStyles, LinkTypes } from './types'

import cl from './style.module.scss'

export interface LinkProps
	extends Omit<LinkHTMLAttributes<HTMLAnchorElement>, 'type' | 'href'> {
	href: string
	className?: string
	styleTypes?: (LinkStyles | LinkTextStyles | LinkSizes)[]
	type?: LinkTypes
}

const Link: FC<LinkProps> = ({
	href,
	type = LinkTypes.DEFAULT,
	styleTypes: styleTypesProps = [],
	children,
	className,
	...defaultProps
}) => {
	const styleTypes = [LinkTextStyles.REGULAR, ...styleTypesProps]
	const linkClasses = classnames([
		cl.link,
		className,
		...styleTypes.map((styleType) => cl[`link${styleType}`])
	])

	// TODO Добавить стили BUTTONS

	switch (type) {
		case LinkTypes.DEFAULT:
			return (
				<NavLink className={linkClasses} to={href} {...defaultProps}>
					{children}
				</NavLink>
			)
		case LinkTypes.TARGET_BLANK:
			return (
				<a
					{...defaultProps}
					className={linkClasses}
					href={href}
					target="_to"
					rel="noreferrer"
				>
					{children}
				</a>
			)
		case LinkTypes.ASIDE:
			const asideLinkActiveClasses = classnames([
				linkClasses,
				cl.linkAsideActive
			])

			return (
				<NavLink
					className={({ isActive }) =>
						isActive ? asideLinkActiveClasses : linkClasses
					}
					to={href}
					{...defaultProps}
				>
					{children}
				</NavLink>
			)
		case LinkTypes.DROPDOWN:
			const linkActiveClasses = classnames([linkClasses, cl.linkDropdownActive])

			return (
				<NavLink
					className={({ isActive }) =>
						isActive ? linkActiveClasses : linkClasses
					}
					to={href}
					{...defaultProps}
				>
					{children}
				</NavLink>
			)
		default:
			return <></>
	}
}

export default Link
