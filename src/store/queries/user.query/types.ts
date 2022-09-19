import { FilterWithPagination, ResponseEntityId } from 'types'

export enum UserQueryApiRoutes {
	BASE_URL = 'users',
	UPDATE_YOURSELF = '/change',
	USERS_CHANGE_PASS = 'users/change-pass'
}

export interface UsersListFilter extends FilterWithPagination {
	usersIdList?: ResponseEntityId[]
}
