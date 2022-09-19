import React, { FC } from 'react'
import { Control, useWatch } from 'react-hook-form'

import Loader from 'UI/Loader'
import Tag from './Tag'
import { ITag } from './types'

import cl from './style.module.scss'

interface TagsProps {
	tagsList: ITag[]
	control: Control<any>
	name: string
	onChange: (tagsIdList: ITag['id'][]) => void
}

const Tags: FC<TagsProps> = ({ tagsList, control, name, onChange }) => {
	const chosenTags: ITag['id'][] = useWatch({ control, name })

	if (!chosenTags) {
		return <Loader />
	}

	const toggleHandler = (tagId: ITag['id']) => {
		onChange(
			chosenTags.includes(tagId)
				? chosenTags.filter((chosenTag) => tagId !== chosenTag)
				: [...chosenTags, tagId]
		)
	}

	return (
		<div className={cl.tagList}>
			{tagsList.map((tag) => (
				<Tag
					onToggle={toggleHandler}
					key={tag.id}
					isActive={chosenTags.includes(tag.id)}
					tag={tag}
				/>
			))}
		</div>
	)
}
export default Tags
