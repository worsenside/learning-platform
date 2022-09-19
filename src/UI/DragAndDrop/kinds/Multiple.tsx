import React, { ChangeEvent, FC, useCallback, useMemo, useRef } from 'react'
import classnames from 'classnames'

import { getUniqueId } from 'helpers'
import {
	clearFileInput,
	getFileList,
	parseIdFromFileName,
	validateFiles,
	filterFileListByFileId
} from 'helpers/files'

import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import { FileId } from 'types'
import { DragAndDropMultipleProps } from '../types'

import attachIcon from '../images/attach.svg'
import deleteIcon from '../images/delete.svg'
import cl from '../style.module.scss'

const DragAndDropMultiple: FC<DragAndDropMultipleProps> = ({
	name,
	files,
	isDrag,
	accept,
	onChange,
	size,
	id,
	...defaultProps
}) => {
	const uniqueId = useMemo(getUniqueId.bind(null, id), [])

	const fileInput = useRef<HTMLInputElement>(null)

	const changeHandler = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			if (!event.target.files?.length) {
				return
			}

			const { typesIsValid, sizeIsValid } = validateFiles({
				files: [...event.target.files],
				accept,
				size
			})

			if (!typesIsValid || !sizeIsValid) {
				clearFileInput(event.target)
				onChange([])

				return
			}

			const fileList = await getFileList([...event.target.files])

			if (!fileList.length) {
				clearFileInput(event.target)
				onChange([])

				return
			}
			event.target.files = fileList

			onChange([...fileList])
		},
		[]
	)
	const deleteHandler = useCallback(
		async (fileId: FileId) => {
			if (!fileInput.current) {
				return
			}

			const filteredFileList = await filterFileListByFileId(files, fileId)
			fileInput.current.files = filteredFileList
			onChange([...filteredFileList])
		},
		[files, fileInput.current]
	)
	return (
		<>
			<div
				{...defaultProps}
				className={classnames([
					cl.fileDragMultiple,
					{
						[cl.fileDragMultipleDragover]: isDrag
					}
				])}
			>
				<span>Перетащите файлы или выберите на компьютере</span>
				<Button styleTypes={[ButtonStyles.TERTIARY]}>
					<img src={attachIcon} alt="selectFileIcon" />
					Выбрать файл
				</Button>
				<input
					name={name}
					ref={fileInput}
					accept={accept}
					type="file"
					onChange={changeHandler}
					id={uniqueId}
					multiple
				/>
				<div>
					<p>Формат: mp4, mp3, mkv.</p>
					<p>Максимальный размер файла: 3 ГБ.</p>
				</div>
			</div>
			{files && (
				<div className={cl.fileDragMultiplePreview}>
					{files.map((file) => {
						const [fileId, fileName] = parseIdFromFileName(file.name)
						return (
							<div className={cl.uploadFile} key={fileId}>
								<span>{fileName}</span>
								<Button onClick={() => deleteHandler(fileId)}>
									<img src={deleteIcon} alt="delete" />
								</Button>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default DragAndDropMultiple
