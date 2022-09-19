import { FileSize, SizeTypes } from 'UI/DragAndDrop/types'

interface ValidateFilesParams {
	files: File[]
	accept?: string
	size?: FileSize
}

interface ValidateFilesValue {
	typesIsValid: boolean
	sizeIsValid: boolean
}

type ValidateFiles = (params: ValidateFilesParams) => ValidateFilesValue

const validateFiles: ValidateFiles = ({
	files,
	accept,
	size: [sizeCount, sizeType] = [0, SizeTypes.BYTE]
}) => {
	const sizeInBytes = sizeCount * sizeType

	const sizeIsValid =
		!sizeInBytes || files.every(({ size: fileSize }) => fileSize < sizeInBytes)

	if (!accept) {
		return { sizeIsValid, typesIsValid: true }
	}

	const typesIsValid = files.every(({ type }) => RegExp(type).test(accept))

	return {
		typesIsValid,
		sizeIsValid
	}
}

export default validateFiles
