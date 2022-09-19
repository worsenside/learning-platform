import React, { FC } from 'react'

import QuestionsListComponent from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm/QuestionsList'
import EmptyQuestionsView from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm/QuestionsList/EmptyQuestionsView'

interface QuestionsListProps {
	questionsList: boolean
}

const QuestionsList: FC<QuestionsListProps> = ({ questionsList }) => (
	<>{questionsList ? <QuestionsListComponent /> : <EmptyQuestionsView />}</>
)

export default QuestionsList
