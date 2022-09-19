import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import { ValidationErrorMessages } from 'types'
import LimitationsFormComponent from 'components/Courses/Entities/Tasks/Tabs/Content/LimitationsForm'
import { ITask } from 'types/models/task.model'
import { useActions } from 'hooks/redux'
import { useScrollToError } from 'hooks'

export interface LimitationsTabFormState
	extends Pick<
		ITask,
		| 'taskResponsibilityStatus'
		| 'passingScore'
		| 'countAttempts'
		| 'datePassStartSettings'
		| 'datePassEndSettings'
	> {}

const LimitationsForm = () => {
	const {
		register,
		control,
		formState,
		setValue,
		handleSubmit,
		getValues,
		watch
	} = useForm<LimitationsTabFormState>({
		defaultValues: {
			datePassStartSettings: {},
			datePassEndSettings: {}
		}
	})

	const taskFormState = watch()
	const { setTask } = useActions((state) => state.task)
	useEffect(() => {
		setTask({
			...taskFormState,
			datePassStartSettings: {
				...taskFormState.datePassStartSettings,
				start: taskFormState.datePassStartSettings.start?.toLocaleDateString(),
				end: taskFormState.datePassStartSettings.end?.toLocaleDateString()
			},
			datePassEndSettings: {
				...taskFormState.datePassEndSettings,
				start: taskFormState.datePassEndSettings.start?.toLocaleDateString(),
				end: taskFormState.datePassEndSettings.end?.toLocaleDateString()
			}
		})
	}, [taskFormState])

	useEffect(() => {
		register('taskResponsibilityStatus')
		register('passingScore', {
			required: ValidationErrorMessages.EMPTY,
			validate: (value) =>
				/^([0-9]|10)$/.test(`${value}`) ||
				ValidationErrorMessages.PASSING_SCORE_INCORRECT
		})
		register('countAttempts', {
			required: ValidationErrorMessages.EMPTY,
			validate: (value) =>
				/^([5-9]|10)$/.test(`${value}`) ||
				ValidationErrorMessages.ATTEMPT_COUNT_INCORRECT
		})
		register('datePassStartSettings.start', {
			validate: (value) =>
				!!(
					!getValues('datePassStartSettings.isActive') ||
					(getValues('datePassStartSettings.end') &&
						new Date(value).toLocaleDateString())
				) || ValidationErrorMessages.DATEPICKER_INCORRECT
		})
		register('datePassStartSettings.end', {
			validate: (value) =>
				!!(
					!getValues('datePassStartSettings.isActive') ||
					(getValues('datePassStartSettings.isActive') &&
						getValues('datePassStartSettings.start') &&
						new Date(value).toLocaleDateString())
				) || ValidationErrorMessages.DATEPICKER_INCORRECT
		})
		register('datePassEndSettings.start', {
			validate: (value) =>
				!!(
					!getValues('datePassEndSettings.isActive') ||
					(getValues('datePassEndSettings.end') &&
						new Date(value).toLocaleDateString())
				) || ValidationErrorMessages.DATEPICKER_INCORRECT
		})
		register('datePassEndSettings.end', {
			validate: (value) =>
				!!(
					!getValues('datePassEndSettings.isActive') ||
					(getValues('datePassEndSettings.isActive') &&
						getValues('datePassEndSettings.start') &&
						new Date(value).toLocaleDateString())
				) || ValidationErrorMessages.DATEPICKER_INCORRECT
		})
	}, [])

	useEffect(() => {
		setValue('countAttempts', 5)
		setValue('passingScore', 10)
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<LimitationsTabFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	useScrollToError(formState)

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
		<LimitationsFormComponent
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			errors={formState.errors}
			watch={watch}
		/>
	)
}

export default LimitationsForm
