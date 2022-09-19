import { NodeElementsId } from 'types'

export interface FilterCourses<CoursesParams> {
	entities: CoursesParams[]
	pageItemsCount: number
	totalItemsCount: number
}

export interface CoursesParams {
	id: NodeElementsId
	name: string
	description: string
	type: string
}
