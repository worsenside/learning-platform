import { IOption } from 'UI/Select/types'

type GetOptionsListFromArray = (
	array: (string | number)[],
	valueIsText?: boolean
) => IOption[]

const getOptionsListFromArray: GetOptionsListFromArray = (
	array,
	valueIsText = false
) =>
	array.map((text, index) => ({
		text: `${text}`,
		value: valueIsText ? text : index
	}))

export default getOptionsListFromArray
