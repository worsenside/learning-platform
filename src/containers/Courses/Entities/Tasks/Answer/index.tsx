import React, { FC, useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import TaskAnswerComponent from 'components/Courses/Entities/Tasks/Answer'
import {
	AnswerResponsibilitiesType,
	ITaskAnswer
} from 'types/models/task.model'
import { ValidationErrorMessages } from 'types'
import { userQuery } from 'store/queries'
import { useAppSelector } from 'hooks/redux'
import GetImageUrlFromFile from 'helpers/files/getImageUrlFromFile'
import { getFileWithoutId } from 'helpers/files'
import { useScrollToError } from 'hooks'

export interface TaskAnswerProps {
	answerResponsibilitiesType?: AnswerResponsibilitiesType
	countAttempts?: number
	maxCountUploadFiles?: number
}

export interface TaskAnswerFormState extends ITaskAnswer {
	docsFiles?: File[]
}

const TaskAnswer: FC<TaskAnswerProps> = (props) => {
	const { token } = useAppSelector((state) => state.system)
	const { data: userInfo } = userQuery.useGetYourselfQuery(token)

	const { register, control, formState, handleSubmit, setValue, watch } =
		useForm<TaskAnswerFormState>()

	const docsFiles = watch('docsFiles')

	useEffect(() => {
		;(async () => {
			setValue(
				'docsFilesInfo',
				await Promise.all(
					(docsFiles || []).map(async (file) => ({
						title: file.name,
						url: (await GetImageUrlFromFile(
							await getFileWithoutId(file)
						)) as string
					}))
				)
			)
		})()
	}, [docsFiles])

	useEffect(() => {
		register('answer', {
			required: ValidationErrorMessages.EMPTY
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<TaskAnswerFormState>) => (value: any) =>
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
		<TaskAnswerComponent
			errors={formState.errors}
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			avatarParams={{
				photoUrl: userInfo?.data.avatarUrl as string,
				lastName: userInfo?.data.lastName,
				firstName: userInfo?.data.firstName
			}}
			{...props}
		/>
	)
}

export default TaskAnswer
