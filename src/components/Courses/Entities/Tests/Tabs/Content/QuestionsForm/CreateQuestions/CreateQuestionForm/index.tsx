import React, { FC } from 'react'
import { Button, RadioGroup, TextArea } from 'UI'
import AnswersList from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/AnswersList'
import { ButtonStyles } from 'UI/Button/types'

import { CreateQuestionFormProps as CreateQuestionFormContainerProps } from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/CreateQuestionForm'
import cl from '../style.module.scss'

interface CreateQuestionFromProps extends CreateQuestionFormContainerProps {}

const CreateQuestionForm: FC<CreateQuestionFromProps> = ({
	errors,
	onChange,
	control,
	onSubmit
}) => (
	<form className={cl.form} onSubmit={onSubmit} noValidate>
		<div className={cl.inputContainer}>
			<label>Выберите тип ответов</label>
			{/* <RadioGroup */}
			{/* 	itemsList={[ */}
			{/* 		{ id: '1', value: 1, labelTitle: 'Выбор одного пункта' }, */}
			{/* 		{ id: '2', value: 2, labelTitle: 'Выбор нескольких ответов' } */}
			{/* 	]} */}
			{/* 	name="answerType" */}
			{/* 	control={control} */}
			{/* 	onChange={onChange('answerType')} */}
			{/* /> */}
		</div>
		<div className={cl.answerContainer}>
			<span>Вопрос 1</span>
			{/* <TextArea */}
			{/* 	placeholder="Введите вопрос..." */}
			{/* 	name="name" */}
			{/* 	control={control} */}
			{/* 	onChange={onChange('name')} */}
			{/* 	error={errors.name?.message} */}
			{/* /> */}
		</div>
		<AnswersList
			errors={errors}
			onChange={onChange}
			control={control}
			onSubmit={onSubmit}
		/>
		<div className={cl.splitLine} />
		<div className={cl.buttons}>
			<Button styleTypes={[ButtonStyles.OUTLINE_PRIMARY, ButtonStyles.ROUND]}>
				Отменить изменения
			</Button>
			<Button
				type="submit"
				styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
			>
				Сохранить изменения
			</Button>
		</div>
	</form>
)

export default CreateQuestionForm
