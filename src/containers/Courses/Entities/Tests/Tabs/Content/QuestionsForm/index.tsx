import React, { useState } from 'react'

import QuestionsFormTabComponents from 'components/Courses/Entities/Tests/Tabs/Content/QuestionsForm'

const QuestionsFormTab = () => {
	const [isCreateMode, setIsCreateMode] = useState(false)
	const [questionsList, setQuestionsList] = useState(false)

	const openIsCreateModeHandler = () => {
		setIsCreateMode(true)
	}
	const closeIsCreateModeHandler = () => {
		setIsCreateMode(false)
	}

	return (
		<QuestionsFormTabComponents
			isCreateMode={isCreateMode}
			questionsList={questionsList}
			openIsCreateMode={openIsCreateModeHandler}
			closeIsCreateMode={closeIsCreateModeHandler}
		/>
	)
}

export default QuestionsFormTab
