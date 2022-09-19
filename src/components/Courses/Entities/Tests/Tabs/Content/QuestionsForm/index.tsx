import React, { FC } from 'react'

import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import plusIconSrc from 'UI/Button/images/plus.svg'
import CreateQuestion from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/Wrapper.container'
import QuestionsList from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/QuestionsList'

import cl from './style.module.scss'

interface QuestionFormProps {
	isCreateMode: boolean
	questionsList: boolean
	openIsCreateMode: () => void
	closeIsCreateMode: () => void
}

const QuestionsForm: FC<QuestionFormProps> = ({
	closeIsCreateMode,
	questionsList,
	openIsCreateMode,
	isCreateMode
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Здесь вы можете добавить вопросы для тестирования</span>
			<Button
				onClick={openIsCreateMode}
				styleTypes={[ButtonStyles.ROUND, ButtonStyles.PRIMARY]}
			>
				<img src={plusIconSrc} alt="plus" />
				Добавить вопрос
			</Button>
		</div>
		{isCreateMode ? (
			<CreateQuestion />
		) : (
			<QuestionsList questionsList={questionsList} />
		)}
	</div>
)

export default QuestionsForm
