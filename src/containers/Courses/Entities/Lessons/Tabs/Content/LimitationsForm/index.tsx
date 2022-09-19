import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import LimitationsFormComponent from 'components/Courses/Entities/Lessons/Tabs/Content/LimitationsForm'
import { ILesson } from 'types/models/lesson.model'
import { useActions } from 'hooks/redux'
import { useScrollToError } from 'hooks'

export interface LimitationsTabFormState
	extends Pick<ILesson, 'lessonResponsibilityStatus'> {}

const LimitationsFormTab = () => {
	const { handleSubmit, setValue, control, formState, watch } =
		useForm<LimitationsTabFormState>()
	const lessonFormState = watch()
	const { setLesson } = useActions((state) => state.lesson)

	useEffect(() => {
		setLesson(lessonFormState)
	}, [lessonFormState])

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
			errors={formState.errors}
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
		/>
	)
}

export default LimitationsFormTab
