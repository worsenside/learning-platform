import React, { FC } from 'react'

import cl from './style.module.scss'

interface VideoProps {
	videoUrl: string
}

const Video: FC<VideoProps> = ({ videoUrl }) => (
	<div className={cl.container}>
		<img src={videoUrl} alt="asdasd" />
	</div>
)

export default Video
