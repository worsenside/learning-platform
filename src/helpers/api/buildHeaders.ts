import isPlainObject from 'lodash/isPlainObject'

import { getItemFromStorage } from 'helpers/storage'

import { StorageKeys } from 'types'
import { ResponseBody } from './getResponse'
import { ResponseQueryParams } from '../getQueryParams'

export interface ResponseParams extends Omit<RequestInit, 'body'> {
	query?: ResponseQueryParams
	needAuth?: boolean
}

type BuildHeaders = (
	params?: Pick<ResponseParams, 'headers' | 'needAuth'>,
	body?: ResponseBody
) => {}

const buildHeaders: BuildHeaders = (params, body) => {
	const token = getItemFromStorage(StorageKeys.TOKEN, '')
	if (params?.needAuth && !token) {
		throw new Error('Токен авторизации отсутсвует')
	}

	const bodyIsJSON = isPlainObject(body)
	const baseHeaders = {
		...(bodyIsJSON ? { 'Content-Type': 'application/json' } : {}),
		Authorization: `Bearer ${token}`,
		Platform: 'lp'
	}

	return {
		...baseHeaders,
		...(params?.headers || {})
	}
}

export default buildHeaders
