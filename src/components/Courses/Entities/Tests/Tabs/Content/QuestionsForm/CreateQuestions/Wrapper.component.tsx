import React, { FC, FormEvent } from 'react'
import {
	Control,
	FieldErrors,
	FieldPath,
	UseFieldArrayRemove
} from 'react-hook-form'

import {
	CreateQuestionFormState,
	QuestionTabs
} from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/Wrapper.container'
import CreateQuestionForm from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/CreateQuestionForm'
import QuestionsTabs from './Tabs'

export interface CreateQuestionsFormProps {
	errors: FieldErrors<CreateQuestionFormState>
	onChange: (name: FieldPath<CreateQuestionFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<CreateQuestionFormState>
	remove: UseFieldArrayRemove
	tabsList: QuestionTabs[]
	selectedQuestionTabId?: QuestionTabs['id']
	onSelectTab: (tabId: QuestionTabs['id']) => void
}

const CreateQuestions: FC<CreateQuestionsFormProps> = ({
	errors,
	onChange,
	control,
	onSubmit,
	remove,
	tabsList,
	selectedQuestionTabId,
	onSelectTab
}) => (
	<>
		<QuestionsTabs
			selectedTabId={selectedQuestionTabId}
			tabs={tabsList}
			onSelectTab={onSelectTab}
			remove={remove}
		/>
		{/* name=`questions.${selectedQuestionTabId}`/!* <CreateQuestionForm *!/ */}
		{/* 	errors={errors} */}
		{/* 	control={control} */}
		{/* 	onChange={onChange} */}
		{/* 	onSubmit={onSubmit} */}
		{/* /> */}
	</>
)

export default CreateQuestions
