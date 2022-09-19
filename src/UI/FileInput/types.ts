import { HTMLAttributes } from 'react'

import { Control } from 'react-hook-form'

export type FileSize = [number, SizeTypes]

export enum AcceptTypes {
	JPG = 'image/jpg',
	JPEG = 'image/jpeg',
	PNG = 'image/png',
	SVG = 'image/svg',
	ALL_IMAGES = 'image/*',
	DOC = 'application/msword',
	DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	XLC = 'application/vnd.ms-excel',
	PDF = 'application/pdf',
	MP3 = 'audio/mpeg',
	MP4 = 'video/mp4',
	MKV = 'video/x-matroska'
}

export interface FileInputBaseProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	name?: string
	accept?: string
	size?: FileSize
}

export interface FileInputSingleProps extends FileInputBaseProps {
	file?: File
	onChange: (file?: File) => void
	files?: never
}

export interface FileInputMultipleProps extends FileInputBaseProps {
	files: File[]
	onChange: (files: File[]) => void
	file?: never
}

interface FileInputAdditionalProps {
	multiple?: boolean
	control: Control<any>
	name: string
	accept?: AcceptTypes[]
}
export type FileInputProps = Omit<
	FileInputSingleProps | FileInputMultipleProps,
	'accept'
> &
	FileInputAdditionalProps

export enum SizeTypes {
	BYTE = 1,
	KB = 1024,
	MB = 1024 ** 2,
	GB = 1024 ** 3
}
