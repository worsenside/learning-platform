import React, { FC, useCallback, useMemo } from 'react'
import { useFieldArray, FieldPath, Control } from 'react-hook-form'

import EmployersSelectComponent from 'components/Courses/Tabs/Content/AccessForm/EmployersSelect'
import { AccessFormTabProps } from 'components/Courses/Tabs/Content/AccessForm'
import { IOption } from 'UI/Select/types'
import { AccessFormState } from '..'

type EmployersFieldsNames = Exclude<
	FieldPath<AccessFormState>,
	`${keyof AccessFormState}.${number}`
>

export interface EmployersSelectProps
	extends Pick<AccessFormTabProps, 'errors' | 'onChange' | 'setValue'> {
	control: Control<any>
	name: EmployersFieldsNames
	employersOptionsList: IOption[]
}

const EmployersSelect: FC<EmployersSelectProps> = ({
	errors,
	onChange,
	control,
	name,
	setValue,
	employersOptionsList
}) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name
	})

	const appendHandler = useCallback(() => {
		const appendedValue = [...employersOptionsList]
			.filter(({ hidden }) => !hidden)
			.shift()?.value

		if (!appendedValue) {
			return
		}

		append(appendedValue)
	}, [employersOptionsList])
	const appendButtonIsDisabled = useMemo(
		() => !employersOptionsList.filter(({ hidden }) => !hidden).length,
		[employersOptionsList]
	)

	return (
		<EmployersSelectComponent
			errors={errors}
			onChange={onChange}
			control={control}
			name={name}
			setValue={setValue}
			onAppend={appendHandler}
			appendButtonIsDisabled={appendButtonIsDisabled}
			remove={remove}
			fields={fields}
			employersOptionsList={employersOptionsList}
		/>
	)
}

export default EmployersSelect
