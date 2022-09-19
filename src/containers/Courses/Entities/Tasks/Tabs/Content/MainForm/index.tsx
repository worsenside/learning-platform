import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import MainFormTabComponent from 'components/Courses/Entities/Tasks/Tabs/Content/MainForm'
import { ITask } from 'types/models/task.model'
import { PatternsType, ValidationErrorMessages } from 'types'
import { getPatterns } from 'helpers'
import { useActions } from 'hooks/redux'
import { useScrollToError } from 'hooks'

export interface MainTabFormState extends Pick<ITask, 'name' | 'description'> {}

const MainFormTab = () => {
	const { register, control, formState, setValue, handleSubmit, watch } =
		useForm<MainTabFormState>()

	const taskFormState = watch()
	const { setTask } = useActions((state) => state.task)

	useEffect(() => {
		setTask(taskFormState)
	}, [taskFormState])

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
	}, [])
	useScrollToError(formState)

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
		<MainFormTabComponent
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			errors={formState.errors}
		/>
	)
}

export default MainFormTab
