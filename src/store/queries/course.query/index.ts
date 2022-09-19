import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { buildHeaders } from 'helpers/api'

import { Constants, ResponseEntityId } from 'types'
import { ICourse } from 'types/models/course.model'
import { CourseQueryApiRoutes } from './types'

const courseQuery = createApi({
	reducerPath: 'courseQuery',
	tagTypes: ['course'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${Constants.API_BASE_URL}/${CourseQueryApiRoutes.BASE_URL}`
	}),
	endpoints: (build) => ({
		getCourse: build.query<{ data: ICourse }, ResponseEntityId | undefined>({
			query: (courseId) => ({
				url: `${courseId}`,
				method: 'GET',
				headers: buildHeaders({ needAuth: true })
			}),
			onQueryStarted(arg): Promise<void> | void {
				if (!arg) {
					throw new Error()
				}
			},
			providesTags: ['course']
		}),
		updateCourse: build.mutation<undefined, FormData>({
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
				headers: buildHeaders({ needAuth: true })
			}),
			invalidatesTags: ['course']
		})
	})
})

export default courseQuery
