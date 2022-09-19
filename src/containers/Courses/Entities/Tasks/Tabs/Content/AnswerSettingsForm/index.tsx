import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import { ValidationErrorMessages } from 'types'
import { ITask } from 'types/models/task.model'
import AnswerSettingsFormTabComponent from 'components/Courses/Entities/Tasks/Tabs/Content/AnswerSettings'
import { useActions } from 'hooks/redux'
import { useScrollToError } from 'hooks'

export interface AnswerSettingsTabFormState
	extends Pick<ITask, 'answerResponsibilitiesType' | 'maxCountUploadFiles'> {}

const AnswerSettingsForm = () => {
	const {
		register,
		control,
		getValues,
		formState,
		setValue,
		handleSubmit,
		watch
	} = useForm<AnswerSettingsTabFormState>({
		defaultValues: {
			answerResponsibilitiesType: {
				isFile: true,
				isText: true
			}
		}
	})

	const taskFormState = watch()
	const { setTask } = useActions((state) => state.task)
	useEffect(() => {
		setTask({
			...taskFormState,
			answerResponsibilitiesType: {
				...taskFormState.answerResponsibilitiesType
			}
		})
	}, [taskFormState])

	useEffect(() => {
		register('answerResponsibilitiesType.isText', {
			validate: (value) =>
				getValues('answerResponsibilitiesType.isFile') ||
				value ||
				ValidationErrorMessages.CHOOSE_AT_LEAST_ONE
		})
		register('answerResponsibilitiesType.isFile', {
			validate: (value) =>
				getValues('answerResponsibilitiesType.isText') ||
				value ||
				ValidationErrorMessages.CHOOSE_AT_LEAST_ONE
		})
		register('maxCountUploadFiles')
	}, [])

	useEffect(() => {
		setValue('answerResponsibilitiesType.isFile', false)
		setValue('answerResponsibilitiesType.isText', true)
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<AnswerSettingsTabFormState>) => (value: any) =>
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
		<AnswerSettingsFormTabComponent
			errors={formState.errors}
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
		/>
	)
}

export default AnswerSettingsForm
