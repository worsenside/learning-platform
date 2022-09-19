import React from 'react'

import emptyIconUrl from './images/emptyIcon.svg'
import cl from '../../style.module.scss'

const EmptyQuestionsView = () => (
	<div className={cl.emptyQuestionsView}>
		<img src={emptyIconUrl} alt="no-content" />
		<span>Добавьте вопросы в тестирование</span>
	</div>
)

export default EmptyQuestionsView
