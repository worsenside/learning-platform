import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { buildHeaders } from 'helpers/api'

import { Constants, ResponseEntityId } from 'types'
import { ISchool } from 'types/models/school.model'
import { SchoolQueryApiRoutes } from './types'

const schoolQuery = createApi({
	reducerPath: 'schoolQuery',
	tagTypes: ['school'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${Constants.API_BASE_URL}/${SchoolQueryApiRoutes.BASE_URL}`
	}),
	endpoints: (build) => ({
		getSchool: build.query<{ data: ISchool }, void>({
			query: () => ({
				url: '',
				method: 'GET',
				headers: buildHeaders({ needAuth: true })
			}),
			providesTags: ['school']
		}),
		updateYourselfSchool: build.mutation<undefined, FormData>({
			query: (body) => ({
				url: '',
				method: 'POST',
				body,
				headers: buildHeaders({ needAuth: true })
			}),
			invalidatesTags: ['school']
		}),
		deleteUserFromSchool: build.mutation<undefined, ResponseEntityId>({
			query: (userId) => ({
				url: `user/${userId}`,
				method: 'DELETE',
				headers: buildHeaders({ needAuth: true })
			}),
			invalidatesTags: ['school']
		})
	})
})

export default schoolQuery
