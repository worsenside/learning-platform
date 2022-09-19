import React, { FC } from 'react'
import classnames from 'classnames'

import { ITag } from './types'

import cl from './style.module.scss'

interface TagProps {
	tag: ITag
	onToggle: (tagId: ITag['id']) => void
	isActive: boolean
}

const Tag: FC<TagProps> = ({ tag, isActive, onToggle }) => (
	<label
		onClick={onToggle.bind(null, tag.id)}
		className={classnames([cl.tagItem], {
			[cl.tagItemSelected]: isActive
		})}
	>
		{tag.text}
	</label>
)

export default Tag
