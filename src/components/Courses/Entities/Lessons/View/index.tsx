import React, { FC } from 'react'

import { Video } from 'UI'
import { ILesson } from 'types/models/lesson.model'
import Contacts from 'containers/Courses/Entities/General/Contacts'

import cl from './style.module.scss'

interface LessonViewProps {
	lesson?: Partial<ILesson>
}

const LessonView: FC<LessonViewProps> = ({ lesson }) => {
	if (!lesson) {
		return <h2>Урок не найден</h2>
	}
	return (
		<div className={cl.container}>
			{(lesson.name || lesson.description) && (
				<div className={cl.header}>
					{lesson.name && <h1>{lesson.name}</h1>}
					{lesson.description && <p>{lesson.description}</p>}
				</div>
			)}
			{/* TODO video component */}
			{!!lesson.mediaFilesInfo?.length && (
				<div className={cl.videoContainer}>
					{lesson.mediaFilesInfo?.map((video) => (
						<Video key={video.url} videoUrl={video.url} />
					))}
				</div>
			)}
			{!!lesson.docsFilesInfo?.length && (
				<div className={cl.docs}>
					<h2>Учебные материалы</h2>
					<div className={cl.docsList}>
						{lesson.docsFilesInfo?.map((documentInfo) => (
							<a
								className={cl.downloadLink}
								key={documentInfo.title}
								href={documentInfo.url}
								download
							>
								{documentInfo.title}
							</a>
						))}
					</div>
				</div>
			)}
			<Contacts />
		</div>
	)
}

export default LessonView
