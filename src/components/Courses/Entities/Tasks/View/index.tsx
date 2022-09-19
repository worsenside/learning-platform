import React, { FC } from 'react'

import { ITask } from 'types/models/task.model'
import TaskAnswer from 'containers/Courses/Entities/Tasks/Answer'
import Contacts from 'containers/Courses/Entities/General/Contacts'

import cl from './style.module.scss'

interface TaskViewProps {
	task?: Partial<ITask<string>>
}

const TaskView: FC<TaskViewProps> = ({ task }) => {
	if (!task) {
		return <h2>Такого задания не найдено</h2>
	}
	return (
		<div className={cl.container}>
			<div className={cl.header}>
				<h1>{task.name}</h1>
				<div className={cl.headerInfo}>
					<div className={cl.headerInfoItem}>
						<span>Задание обязательное</span>
						<span>{task.taskResponsibilityStatus === 1 ? 'Да' : 'Нет'}</span>
					</div>
					<div className={cl.headerInfoItem}>
						<span>Период прохождения</span>
						<span>
							{task.datePassStartSettings?.isActive &&
							task.datePassStartSettings?.start &&
							task.datePassStartSettings?.end
								? `${task.datePassStartSettings?.start} — ${task.datePassStartSettings?.end}`
								: '—'}
						</span>
					</div>
					<div className={cl.headerInfoItem}>
						<span>Последние изменения</span>
						<span>{task.dateLastChange ? `${task.dateLastChange}` : '-'}</span>
					</div>
				</div>
				{task.description && <p className={cl.caption}>{task.description}</p>}
			</div>
			{(task.answerResponsibilitiesType?.isFile ||
				task.answerResponsibilitiesType?.isText) && (
				<TaskAnswer
					maxCountUploadFiles={task.maxCountUploadFiles}
					countAttempts={task.countAttempts}
					answerResponsibilitiesType={task.answerResponsibilitiesType}
				/>
			)}
			<Contacts />
		</div>
	)
}

export default TaskView
