import React, {
	ChangeEvent,
	FC,
	useCallback,
	useMemo,
	useRef,
	useState
} from 'react'
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
import { DragAndDropSingleProps } from '../types'

import defaultImage from '../images/fileDefault.svg'
import cl from '../style.module.scss'

const DragAndDropSingle: FC<DragAndDropSingleProps> = ({
	previewUrl,
	name,
	isDrag,
	accept,
	onChange,
	size,
	id,
	...defaultProps
}) => {
	const uniqueId = useMemo(getUniqueId.bind(null, id), [])

	const fileInput = useRef<HTMLInputElement>(null)

	const [fileUrl, setFileUrl] = useState(previewUrl)

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
				setFileUrl('')
				return
			}

			const fileList = await getFileList(filesList)
			event.target.files = fileList

			const file = [...fileList].pop()
			const currentFileUrl = await getImageUrlFromFile(filesList.pop())
			if (!file || !currentFileUrl) {
				setFileUrl('')
				return
			}

			setFileUrl(currentFileUrl)
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
		setFileUrl('')
	}, [fileInput.current])

	return (
		<div className={cl.fileDragSingleWrapper}>
			<div
				{...defaultProps}
				className={classnames([
					cl.fileDragSingle,
					{
						[cl.fileDragSingleDragover]: isDrag
					}
				])}
			>
				<input
					name={name}
					ref={fileInput}
					accept={accept}
					onChange={changeHandler}
					id={uniqueId}
					type="file"
				/>
				<img
					className={classnames({ [cl.FullSize]: !!fileUrl })}
					src={fileUrl || defaultImage}
					alt="drag"
				/>
			</div>
			<div className={cl.fileDragSingleOptions}>
				<p>Формат: jpg, png, bmp.</p>
				<p>Максимальный размер файла: 10-12Mb.</p>
				<div className={cl.fileDragSingleActions}>
					<Button
						styleTypes={[ButtonStyles.OUTLINE_PRIMARY, ButtonStyles.ROUND]}
					>
						<label htmlFor={uniqueId}>Загрузить</label>
					</Button>
					{fileUrl && (
						<Button
							styleTypes={[ButtonStyles.OUTLINE_DARK, ButtonStyles.ROUND]}
							onClick={deleteHandler}
						>
							Удалить
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default DragAndDropSingle
