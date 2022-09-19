import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import {
	TaskAnswerFormState,
	TaskAnswerProps as TaskAnswerContainerProps
} from 'containers/Courses/Entities/Tasks/Answer'

import { Avatar, Button, TextArea } from 'UI'
import { IAvatar } from 'UI/Avatar/types'
import { ButtonStyles } from 'UI/Button/types'
import FileInput from 'UI/FileInput'

import cl from './style.module.scss'

interface TaskAnswerProps extends TaskAnswerContainerProps {
	errors: FieldErrors<TaskAnswerFormState>
	onChange: (name: FieldPath<TaskAnswerFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<TaskAnswerFormState>
	avatarParams: IAvatar
}

const TaskAnswer: FC<TaskAnswerProps> = ({
	answerResponsibilitiesType,
	errors,
	onChange,
	onSubmit,
	control,
	countAttempts,
	avatarParams = {}
}) => (
	<div className={cl.container}>
		<h2>Ответ на задание</h2>
		<form onSubmit={onSubmit} noValidate className={cl.form}>
			<div className={cl.attemptsCount}>
				<span>Попытка</span>
				<div className={cl.attempt}>1</div>
				<span>из</span>
				<div className={cl.attempt}>{countAttempts}</div>
			</div>
			<div className={cl.answerInfo}>
				<div className={cl.avatar}>
					<Avatar
						firstName={avatarParams.firstName}
						lastName={avatarParams.lastName}
						photoUrl={avatarParams.photoUrl}
					/>
				</div>
				<div className={cl.fields}>
					{answerResponsibilitiesType?.isText && (
						<TextArea
							className={cl.answerTextarea}
							name="answer"
							error={errors.answer?.message}
							control={control}
							onChange={onChange('answer')}
							placeholder="Напишите ответ"
						/>
					)}
					<div className={cl.buttons}>
						{answerResponsibilitiesType?.isFile && (
							<FileInput
								multiple
								name="docsFiles"
								onChange={onChange('docsFiles')}
								control={control}
							/>
						)}
						<Button
							className={cl.submitBtn}
							styleTypes={[ButtonStyles.QUATERNARY, ButtonStyles.ROUND]}
							type="submit"
						>
							Отправить ответ
						</Button>
					</div>
				</div>
			</div>
		</form>
	</div>
)

export default TaskAnswer
