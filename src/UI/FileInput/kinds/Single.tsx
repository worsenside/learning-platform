import React, { ChangeEvent, FC, useCallback, useMemo, useRef } from 'react'
import classnames from 'classnames'

import { getUniqueId } from 'helpers'
import {
	clearFileInput,
	getFileList,
	getImageUrlFromFile,
	validateFiles
} from 'helpers/files'
import Button from 'UI/Button'
import { ButtonStyles } from 'UI/Button/types'
import plusIconSrc from 'UI/Button/images/plus-black-quarternary.svg'
import { FileInputSingleProps } from '../types'

import cl from '../style.module.scss'

const DragAndDropSingle: FC<FileInputSingleProps> = ({
	name,
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
			const filesList = [...event.target.files]
			const { typesIsValid, sizeIsValid } = validateFiles({
				files: filesList,
				accept,
				size
			})

			if (!typesIsValid || !sizeIsValid) {
				clearFileInput(event.target)
				onChange()
				return
			}

			const fileList = await getFileList(filesList)
			event.target.files = fileList

			const file = [...fileList].pop()
			const currentFileUrl = await getImageUrlFromFile(filesList.pop())
			if (!file || !currentFileUrl) {
				return
			}

			onChange(file)
		},
		[]
	)

	const deleteHandler = useCallback(() => {
		if (!fileInput.current) {
			return
		}

		onChange()
		clearFileInput(fileInput.current)
	}, [fileInput.current])

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
					styleTypes={[ButtonStyles.OUTLINE_QUATERNARY, ButtonStyles.ROUND]}
				>
					<img src={plusIconSrc} alt="plus" />
					<label htmlFor={uniqueId}>Загрузить</label>
				</Button>
			</div>
		</div>
	)
}

export default DragAndDropSingle
