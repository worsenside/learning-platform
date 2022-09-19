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

export interface DragAndDropBaseProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	name?: string
	isDrag: boolean
	accept?: string
	size?: FileSize
}

export interface DragAndDropSingleProps extends DragAndDropBaseProps {
	file?: File
	previewUrl: string
	onChange: (file?: File) => void
	files?: never
}

export interface DragAndDropMultipleProps extends DragAndDropBaseProps {
	files: File[]
	onChange: (files: File[]) => void
	file?: never
	previewUrl?: never
}

interface DragAndDropAdditionalProps {
	multiple?: boolean
	control: Control<any>
	name: string
	accept?: AcceptTypes[]
}
export type DragAndDropProps = Omit<
	DragAndDropMultipleProps | DragAndDropSingleProps,
	'isDrag' | 'accept'
> &
	DragAndDropAdditionalProps

export enum SizeTypes {
	BYTE = 1,
	KB = 1024,
	MB = 1024 ** 2,
	GB = 1024 ** 3
}
