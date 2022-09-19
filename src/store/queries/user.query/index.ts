import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { buildHeaders } from 'helpers/api'

import { Constants, ResponseEntitiesList, ResponseEntityId } from 'types'
import { IUser } from 'types/models/user.model'
import { UserQueryApiRoutes, UsersListFilter } from './types'

const userQuery = createApi({
	reducerPath: 'userQuery',
	tagTypes: ['user'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${Constants.API_BASE_URL}/${UserQueryApiRoutes.BASE_URL}`
	}),
	endpoints: (build) => ({
		getYourself: build.query<{ data: IUser }, string | void>({
			query: (token) => ({
				url: '',
				method: 'GET',
				headers: buildHeaders({
					needAuth: true,
					headers: token ? { Authorization: `Bearer ${token}` } : {}
				})
			}),
			providesTags: ['user']
		}),
		getUserById: build.query<{ data: IUser }, ResponseEntityId>({
			query: (userId) => ({
				url: `/${userId}`,
				method: 'GET',
				headers: buildHeaders({ needAuth: true })
			}),
			providesTags: ['user']
		}),
		getUsers: build.query<ResponseEntitiesList<IUser>, UsersListFilter>({
			query: (filter) => ({
				url: '',
				method: 'POST',
				body: filter,
				headers: buildHeaders({ needAuth: true }, filter)
			}),
			providesTags: ['user']
		}),
		updateYourself: build.mutation<undefined, FormData>({
			query: (body) => ({
				url: UserQueryApiRoutes.UPDATE_YOURSELF,
				method: 'POST',
				body,
				headers: buildHeaders({ needAuth: true })
			}),
			invalidatesTags: ['user']
		})
	})
})

export default userQuery
