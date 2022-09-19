import React, { FC } from 'react'
import classnames from 'classnames'

import { LoaderStyles } from './types'

import cl from './style.module.scss'

export interface LoaderProps {
	styleTypes?: LoaderStyles[]
}

const Loader: FC<LoaderProps> = ({ styleTypes = [] }) => (
	<div className={cl.container}>
		<div
			className={classnames([
				cl.loader,
				...styleTypes.map((styleType) => cl[`loader${styleType}`])
			])}
		/>
	</div>
)

export default Loader
