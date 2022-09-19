import React, { FC } from 'react'

import { useWatch } from 'react-hook-form'
import {
	FileInputMultipleProps,
	FileInputProps,
	FileInputSingleProps
} from './types'
import { FileInputMultiple, FileInputSingle } from './kinds'

const FileInput: FC<FileInputProps> = ({
	multiple: isMultiple = false,
	accept,
	size,
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

	return (
		<>
			{isMultiple ? (
				<FileInputMultiple
					name={name}
					accept={accept?.toString()}
					size={size}
					files={value}
					onChange={onChange as FileInputMultipleProps['onChange']}
				/>
			) : (
				<FileInputSingle
					id={id}
					name={name}
					accept={accept?.toString()}
					size={size}
					file={value}
					onChange={onChange as FileInputSingleProps['onChange']}
				/>
			)}
		</>
	)
}
export default FileInput
