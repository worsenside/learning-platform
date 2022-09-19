import React, { useCallback, useMemo, useState } from 'react'
import { FieldPath, useFieldArray, useForm } from 'react-hook-form'

import { ITest } from 'types/models/test.model'
import CreateQuestionsComponent from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/Wrapper.component'

export interface CreateQuestionFormState extends Pick<ITest, 'questions'> {}

export interface QuestionTabs {
	id: number
	text: string
}

const CreateQuestions = () => {
	const { control, formState, handleSubmit, setValue, watch } =
		useForm<CreateQuestionFormState>({
			defaultValues: {
				questions: [
					{ name: '123' },
					{ name: '123' },
					{ name: '123' },
					{ name: '123' }
				]
			}
		})

	const questions = watch('questions')

	const { fields, remove } = useFieldArray({ control, name: 'questions' })

	const tabsList = useMemo(
		(): QuestionTabs[] =>
			questions.map((question, fieldIndex) => ({
				id: fieldIndex,
				text: question.name
			})),
		[questions]
	)
	const [selectedQuestionTabId, setSelectedQuestionTabId] =
		useState<QuestionTabs['id']>()

	const selectTabHandler = useCallback((tabId) => {
		setSelectedQuestionTabId(tabId)
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<CreateQuestionFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	const submitHandler = useCallback(
		handleSubmit(async (data) => {
			console.log(data)
		}),
		[handleSubmit]
	)

	return (
		<CreateQuestionsComponent
			errors={formState.errors}
			remove={remove}
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			tabsList={tabsList}
			onSelectTab={selectTabHandler}
			selectedQuestionTabId={selectedQuestionTabId}
		/>
	)
}

export default CreateQuestions
