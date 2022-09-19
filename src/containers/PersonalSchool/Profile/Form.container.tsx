import React, { useCallback, useEffect, useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import isURL from 'validator/lib/isURL'

import { SchoolForm as SchoolFormComponent } from 'components'
import { ValidationErrorMessages, PatternsType, ResponseWithError } from 'types'
import { schoolQuery } from 'store/queries'
import { Loader } from 'UI'
import { LoaderStyles } from 'UI/Loader/types'
import { useActions } from 'hooks/redux'
import { IMainSchoolInfo } from 'types/models/school.model'
import { getFormData, getPatterns } from 'helpers'
import { SuccessChangeInfoModal } from 'components/PersonalSchool/modals'
import { useScrollToError } from 'hooks'

export interface SchoolProfileFormState extends IMainSchoolInfo {
	avatar?: File
	avatarUrl?: string
}

const SchoolForm = () => {
	const [successChangeInfoModalIsOpen, setChangeInfoModalIsOpen] =
		useState(false)

	const [updateYourselfSchool] = schoolQuery.useUpdateYourselfSchoolMutation()
	const { pushError } = useActions((state) => state.system)
	const { isLoading, data: schoolData } = schoolQuery.useGetSchoolQuery()

	const { register, control, getValues, formState, setValue, handleSubmit } =
		useForm<SchoolProfileFormState>()

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
		register('websiteUrl', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			},
			validate: (value) => isURL(value) || ValidationErrorMessages.INCORRECT
		})
	}, [])

	useEffect(() => {
		const school = schoolData
		if (!school) {
			return
		}
		setValue('name', school.data.name.trim())
		setValue('avatarUrl', school.data.avatarUrl)
		setValue('description', school.data.description.trim())
		setValue('websiteUrl', school.data.websiteUrl.trim())
		setValue('avatarUrl', school.data.avatarUrl)
	}, [schoolData])

	const closeModalHandler = () => {
		setChangeInfoModalIsOpen(false)
	}

	const changeHandler = useCallback(
		(name: FieldPath<SchoolProfileFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit(async (data) => {
			const response = await updateYourselfSchool(await getFormData(data))
			const { error } = response as unknown as ResponseWithError
			if (error) {
				pushError(error.data)
				return
			}
			setChangeInfoModalIsOpen(true)
		}),
		[handleSubmit]
	)

	if (isLoading) {
		return <Loader styleTypes={[LoaderStyles.BIG]} />
	}
	return (
		<>
			<SchoolFormComponent
				control={control}
				onChange={changeHandler}
				errors={formState.errors}
				getValues={getValues}
				onSubmit={submitHandler}
			/>
			<SuccessChangeInfoModal
				isOpen={successChangeInfoModalIsOpen}
				onClose={closeModalHandler}
			/>
		</>
	)
}
export default SchoolForm
