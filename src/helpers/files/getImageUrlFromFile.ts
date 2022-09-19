type GetImageUrlFromFile = (file?: File) => Promise<string | null>

const getImageUrlFromFile: GetImageUrlFromFile = async (file) => {
	if (!file) {
		return ''
	}

	const fileReader = new FileReader()

	fileReader.readAsDataURL(file)

	return new Promise((resolve) => {
		fileReader.onloadend = () => resolve(fileReader.result as string)
	})
}

export default getImageUrlFromFile
