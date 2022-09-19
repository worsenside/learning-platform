import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import MainFormTabComponents from 'components/Courses/Entities/Tests/Tabs/Content/MainForm'
import { ITest } from 'types/models/test.model'
import { PatternsType, ValidationErrorMessages } from 'types'
import { getPatterns } from 'helpers'

export interface MainTabFormState
	extends Pick<ITest, 'name' | 'description' | 'type'> {}

const MainFormTab = () => {
	const { register, control, formState, setValue, handleSubmit } =
		useForm<MainTabFormState>()

	useEffect(() => {
		register('name', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('description', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('type', {
			required: ValidationErrorMessages.CHOOSE_AT_LEAST_ONE
		})
	}, [])

	useEffect(() => {
		setValue('type', 1)
		setValue('name', 'Тестирование 1')
		setValue('description', 'Описание тестирования')
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<MainTabFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	const submitHandler = useCallback(
		handleSubmit(async (data) => {
			console.log(data)
			// const response = await updateYourself(await getFormData(data))
			// const { error } = response as unknown as ResponseWithError
			// if (error) {
			// 	pushError(error.data)
			// 	return
			// }
			//
			// setChangeInfoModalIsOpen(true)
		}),
		[handleSubmit]
	)

	return (
		<MainFormTabComponents
			onSubmit={submitHandler}
			errors={formState.errors}
			control={control}
			onChange={changeHandler}
		/>
	)
}

export default MainFormTab
