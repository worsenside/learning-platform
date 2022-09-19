import React, { FC, useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import CreateSectionModalComponent from 'components/Courses/Tabs/Content/ContentForm/modals/CreateSection'
import { ValidationErrorMessages } from 'types'
import { DevTool } from '@hookform/devtools'

export interface CreateSectionModalProps {
	isModalOpen: boolean
	closeModal: () => void
}

export interface SectionFormState {
	name: string
}

const CreateSectionModal: FC<CreateSectionModalProps> = (props) => {
	const {
		register,
		getValues,
		control,
		setValue,
		formState: { errors },
		handleSubmit
	} = useForm<SectionFormState>()

	useEffect(() => {
		register('name', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			}
		})
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<SectionFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	const submitHandler = useCallback(
		handleSubmit((data) => {
			console.log(data)
		}),
		[]
	)

	return (
		<>
			<CreateSectionModalComponent
				onChange={changeHandler}
				errors={errors}
				control={control}
				onSubmit={submitHandler}
				{...props}
			/>
		</>
	)
}

export default CreateSectionModal
