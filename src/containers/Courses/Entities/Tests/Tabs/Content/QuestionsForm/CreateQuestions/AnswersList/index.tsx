import React, { FC, useCallback } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import AnswersListComponent from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/AnswersList'
import { CreateQuestionFormProps } from '../CreateQuestionForm'

export interface AnswersListProps
	extends Pick<CreateQuestionFormProps, 'errors' | 'onChange' | 'onSubmit'> {
	control: Control<any>
}

const AnswersList: FC<AnswersListProps> = ({
	errors,
	onChange,
	control,
	onSubmit
}) => {
	const { fields, remove, append } = useFieldArray({ control, name: 'answers' })

	const appendHandler = useCallback(() => {
		append({ value: '', comment: '' })
	}, [])

	return (
		<AnswersListComponent
			remove={remove}
			errors={errors}
			onChange={onChange}
			onSubmit={onSubmit}
			control={control}
			appendHandler={appendHandler}
			fields={fields}
		/>
	)
}

export default AnswersList
