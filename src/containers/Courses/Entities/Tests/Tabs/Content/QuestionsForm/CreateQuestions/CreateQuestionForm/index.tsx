import React, { FC } from 'react'

import CreateQuestionFormComponent from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/CreateQuestionForm'
import { CreateQuestionsFormProps } from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/Wrapper.component'

export interface CreateQuestionFormProps
	extends Omit<CreateQuestionsFormProps, 'remove'> {}

// 1. Прокидываю нейм. (или индекс или нейм)
// 2. По нейму достаю question из watch

const CreateQuestionForm: FC<CreateQuestionFormProps> = (props) => (
	<CreateQuestionFormComponent {...props} />
)

export default CreateQuestionForm
