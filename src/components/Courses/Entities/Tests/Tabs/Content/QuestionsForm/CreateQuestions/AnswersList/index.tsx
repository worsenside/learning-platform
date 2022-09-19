import React, { FC } from 'react'
import { Button, RadioGroup, TextInput } from 'UI'

import { AnswersListProps as AnswersListContainerProps } from 'containers/Courses/Entities/Tests/Tabs/Content/QuestionsForm/CreateQuestions/AnswersList'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import plusIconSrc from 'UI/Button/images/plus-secondary.svg'
import trashIconSrc from 'UI/Button/images/trash.svg'
import { UseFieldArrayRemove } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import cl from '../style.module.scss'

interface AnswersListProps extends Omit<AnswersListContainerProps, 'name'> {
	fields: Record<'id', string>[]
	appendHandler: () => void
	remove: UseFieldArrayRemove
}

const AnswersList: FC<AnswersListProps> = ({
	fields,
	control,
	onChange,
	errors,
	remove,
	appendHandler
}) => (
	<div className={cl.answers}>
		<DevTool control={control} />
		{fields.map((field, index) => (
			<div className={cl.inputs} key={field.id}>
				<div className={cl.inputContainer}>
					{/* <TextInput */}
					{/* 	onChange={onChange(`answers.${index}.value`)} */}
					{/* 	control={control} */}
					{/* 	name={`answers.${index}.value`} */}
					{/* 	placeholder={`Вариант ответа ${index + 1}`} */}
					{/* /> */}
					{/* <TextInput */}
					{/* 	onChange={onChange(`answers.${index}.comment`)} */}
					{/* 	control={control} */}
					{/* 	name={`answers.${index}.comment`} */}
					{/* 	placeholder="Комментарий к ответу" */}
					{/* /> */}
					{/* <RadioGroup */}
					{/* 	itemsList={[ */}
					{/* 		{ */}
					{/* 			id: '1', */}
					{/* 			value: `${index}`, */}
					{/* 			labelTitle: 'Верный вариант ответа' */}
					{/* 		} */}
					{/* 	]} */}
					{/* 	name="correctAnswersIndexList" */}
					{/* 	control={control} */}
					{/* 	onChange={onChange(`correctAnswersIndexList`)} */}
					{/* /> */}
					<div className={cl.splitLine} />
				</div>
				<Button onClick={() => remove(index)}>
					<img src={trashIconSrc} alt="delete" />
				</Button>
			</div>
		))}
		<Button
			styleTypes={[
				ButtonStyles.ROUND,
				ButtonSizes.SMALL,
				ButtonStyles.DEFAULT_BG
			]}
			className={cl.addBtn}
			onClick={appendHandler}
		>
			<img src={plusIconSrc} alt="plus" />
			Добавить
		</Button>
	</div>
)

export default AnswersList
