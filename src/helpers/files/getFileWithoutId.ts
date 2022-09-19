import getImageUrlFromFile from './getImageUrlFromFile'
import parseIdFromFileName from './parseIdFromFileName'

type GetFileWithoutId = (file: File) => Promise<File | undefined>

const getFileWithoutId: GetFileWithoutId = async (file: File) => {
	const url = await getImageUrlFromFile(file)
	if (!url) {
		return
	}

	const [id, name] = parseIdFromFileName(file.name)

	return new File([url], name, {
		type: file.type
	})
}

export default getFileWithoutId
