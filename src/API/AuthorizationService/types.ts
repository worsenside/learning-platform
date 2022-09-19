export interface AuthorizationService {
	authorize: Authorize
	refreshToken: RefreshToken
}

export interface AuthorizeParams {
	email: string
	password: string
}
interface AuthorizeValue {
	token: string
}
type Authorize = (params: AuthorizeParams) => Promise<AuthorizeValue>

interface RefreshTokenValue {
	token: string
}
type RefreshToken = () => Promise<RefreshTokenValue>

export enum AuthorizationApiRoutes {
	AUTHORIZE = 'auth/login',
	REFRESH_TOKEN = 'auth/refresh'
}
