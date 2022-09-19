import React, { ChangeEvent, FC, useCallback, useMemo, useRef } from 'react'

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
import plusIconSrc from 'UI/Button/images/plus-black-quarternary.svg'
import { FileInputMultipleProps } from '../types'
import deleteIcon from '../images/delete.svg'

import cl from '../style.module.scss'

const DragAndDropMultiple: FC<FileInputMultipleProps> = ({
	name,
	files,
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
		<div className={cl.fileInputWrapper}>
			<div {...defaultProps} className={cl.fileInput}>
				<input
					name={name}
					ref={fileInput}
					accept={accept}
					onChange={changeHandler}
					id={uniqueId}
					type="file"
				/>
				<Button
					className={cl.addFileBtn}
					styleTypes={[ButtonStyles.OUTLINE_QUATERNARY, ButtonStyles.ROUND]}
				>
					<img src={plusIconSrc} alt="plus" />
					<label htmlFor={uniqueId}>Прикрепить файл</label>
				</Button>
			</div>
			{!!files.length && (
				<div className={cl.fileInputMultiplePreview}>
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
		</div>
	)
}

export default DragAndDropMultiple
