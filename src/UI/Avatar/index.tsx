import React, { FC } from 'react'
import classnames from 'classnames'

import { getInitialsByFullName } from 'helpers'

import { AvatarProps, AvatarSizes } from './types'

import cl from './style.module.scss'

const Avatar: FC<AvatarProps> = ({
	photoUrl,
	firstName,
	lastName,
	styleTypes: styleTypesProps = []
}) => {
	const styleTypes = [AvatarSizes.SMALL, ...styleTypesProps]

	return (
		<div
			className={classnames([
				cl.avatar,
				...styleTypes.map((styleType) => cl[`avatar${styleType}`])
			])}
		>
			{photoUrl ? (
				<img src={photoUrl} alt="avatar" />
			) : (
				<div className={cl.emptyPhoto}>
					<span>{getInitialsByFullName(firstName, lastName)}</span>
				</div>
			)}
		</div>
	)
}

export default Avatar
