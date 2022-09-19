import React, { DragEventHandler, FC, useCallback, useState } from 'react'

import { useWatch } from 'react-hook-form'
import {
	DragAndDropMultipleProps,
	DragAndDropProps,
	DragAndDropSingleProps
} from './types'
import { DragAndDropSingle, DragAndDropMultiple } from './kinds'

const DragAndDrop: FC<DragAndDropProps> = ({
	multiple: isMultiple = false,
	accept,
	size,
	previewUrl = '',
	onChange,
	id,
	control,
	name
}) => {
	const value = useWatch({
		control,
		name,
		defaultValue: isMultiple ? [] : undefined
	})

	// TODO Добавить зашитую валидацию
	const [isDrag, setIsDrag] = useState(false)

	const dragEnterHandler: DragEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			event.preventDefault()
			setIsDrag(true)
		},
		[]
	)
	const dragLeaveHandler: DragEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			event.preventDefault()
			setIsDrag(false)
		},
		[]
	)

	return (
		<>
			{isMultiple ? (
				<DragAndDropMultiple
					name={name}
					accept={accept?.toString()}
					size={size}
					files={value}
					onChange={onChange as DragAndDropMultipleProps['onChange']}
					isDrag={isDrag}
					onDragEnter={dragEnterHandler}
					onDragLeave={dragLeaveHandler}
				/>
			) : (
				<DragAndDropSingle
					id={id}
					name={name}
					previewUrl={previewUrl}
					accept={accept?.toString()}
					size={size}
					file={value}
					onChange={onChange as DragAndDropSingleProps['onChange']}
					isDrag={isDrag}
					onDragEnter={dragEnterHandler}
					onDragLeave={dragLeaveHandler}
				/>
			)}
		</>
	)
}
export default DragAndDrop
