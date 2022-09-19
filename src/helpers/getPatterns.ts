import { PatternsType } from 'types'

interface PatternsOptions {
	numberLimit?: number
}

type GetPatterns = (
	patternType: PatternsType,
	options?: PatternsOptions
) => RegExp

const getPatterns: GetPatterns = (patternType, options) => {
	switch (patternType) {
		case PatternsType.TRIM_STRING:
			return /^[^\s]+(?:$|.*[^\s]+$)/
		case PatternsType.MAX_NUMBER:
			return /[1-10]/
		default:
	}

	return / /
}

export default getPatterns
