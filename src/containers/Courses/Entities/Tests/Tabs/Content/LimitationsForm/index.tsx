import React, { useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import LimitationsFormTabComponents from 'components/Courses/Entities/Tests/Tabs/Content/LimitationsForm'
import { ITest } from 'types/models/test.model'
import { ValidationErrorMessages } from 'types'

export interface LimitationsTabFormState
	extends Pick<
		ITest,
		| 'testResponsibilityStatus'
		| 'passingTimeLimit'
		| 'passingScore'
		| 'countRightAnswers'
		| 'datePassStartSettings'
		| 'datePassEndSettings'
	> {}

const LimitationsFormTab = () => {
	const {
		register,
		control,
		formState,
		setValue,
		handleSubmit,
		watch,
		getValues
	} = useForm<LimitationsTabFormState>()

	useEffect(() => {
		register('testResponsibilityStatus', {
			required: ValidationErrorMessages.CHOOSE_AT_LEAST_ONE
		})
		register('countRightAnswers', {
			required: ValidationErrorMessages.EMPTY
		})
		register('countRightAnswers', {
			required: ValidationErrorMessages.EMPTY
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

	const changeHandler = useCallback(
		(name: FieldPath<LimitationsTabFormState>) => (value: any) =>
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
		<LimitationsFormTabComponents
			watch={watch}
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			errors={formState.errors}
		/>
	)
}

export default LimitationsFormTab
