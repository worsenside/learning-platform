import { ArchivedIcon, PublishedIcon, TrashedIcon } from './icons'

export const coursesAccordionData = [
	{
		id: 1,
		iconSrcUrl: PublishedIcon,
		label: 'Опубликованные курсы',
		contentItemsLength: 'Курсов - 5',
		type: 'published'
	},
	{
		id: 2,
		iconSrcUrl: TrashedIcon,
		label: 'Черновики',
		contentItemsLength: 'Курсов - 5',
		type: 'trashed'
	},
	{
		id: 3,
		iconSrcUrl: ArchivedIcon,
		label: 'Архивные',
		contentItemsLength: 'Курсов - 5',
		type: 'archived'
	}
]
