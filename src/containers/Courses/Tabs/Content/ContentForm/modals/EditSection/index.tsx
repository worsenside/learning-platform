import React, { FC, useCallback, useEffect } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import EditSectionModalComponent from 'components/Courses/Tabs/Content/ContentForm/modals/EditSection'
import { ValidationErrorMessages } from 'types'

export interface EditSectionModalProps {
	isModalOpen: boolean
	closeModal: () => void
}

export interface SectionFormState {
	name: string
}

const EditSectionModal: FC<EditSectionModalProps> = (props) => {
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
		<EditSectionModalComponent
			control={control}
			onSubmit={submitHandler}
			errors={errors}
			onChange={changeHandler}
			{...props}
		/>
	)
}

export default EditSectionModal
