import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import MainFormComponent from 'components/Courses/Entities/Lessons/Tabs/Content/MainForm'
import { ILesson, LessonMediaFiles } from 'types/models/lesson.model'
import { PatternsType, ValidationErrorMessages } from 'types'
import { getPatterns } from 'helpers'
import { useActions } from 'hooks/redux'
import { getFileWithoutId } from 'helpers/files'
import GetImageUrlFromFile from 'helpers/files/getImageUrlFromFile'
import { useScrollToError } from 'hooks'

export interface MainTabFormState
	extends Omit<ILesson, 'lessonResponsibilityStatus'> {
	mediaFiles?: File[]
	docsFiles?: File[]
}

const MainFormTab = () => {
	const { register, handleSubmit, setValue, control, watch, formState } =
		useForm<MainTabFormState>()

	const lessonFormState = watch()
	const mediaFiles = watch('mediaFiles')
	const docsFiles = watch('docsFiles')
	const { setLesson } = useActions((state) => state.lesson)

	useEffect(() => {
		setLesson(lessonFormState)
	}, [lessonFormState])

	useEffect(() => {
		;(async () => {
			setValue(
				'mediaFilesInfo',
				await Promise.all(
					(mediaFiles || []).map(async (file) => ({
						url: (await GetImageUrlFromFile(
							await getFileWithoutId(file)
						)) as string,
						type: LessonMediaFiles.VIDEO
					}))
				)
			)
		})()
	}, [mediaFiles])

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

	const changeHandler = useCallback(
		(name: FieldPath<MainTabFormState>) => (value: any) =>
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
		<MainFormComponent
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			errors={formState.errors}
		/>
	)
}

export default MainFormTab
