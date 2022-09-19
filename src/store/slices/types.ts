export interface SliceMetaData {
	isLoading: boolean
	error: string
}

export interface BaseSliceState {
	meta: SliceMetaData
}
