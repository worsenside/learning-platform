interface GetMillisecondsFromTimeOptions {
	hours?: number
	minutes?: number
	seconds?: number
}
interface GetMillisecondsFromTimeResult {
	milliseconds: number
	hours?: number
	minutes?: number
	seconds?: number
}
type GetMillisecondsFromTime = (
	milliseconds: number,
	options?: GetMillisecondsFromTimeOptions
) => GetMillisecondsFromTimeResult

export const getMillisecondsFromTime: GetMillisecondsFromTime = (
	milliseconds,
	options = {}
) => {
	const hours =
		(options.hours ?? Math.floor(milliseconds / (1000 * 60 * 60))) || undefined
	const minutes =
		(options.minutes ?? Math.floor((milliseconds / (1000 * 60)) % 60)) ||
		undefined
	const seconds =
		(options.seconds ?? Math.floor(milliseconds / 1000) % 60) || undefined
	const resultMilliseconds =
		(hours || 0) * 60 * 60 * 1000 +
		(minutes || 0) * 60 * 1000 +
		(seconds || 0) * 1000

	return { hours, milliseconds: resultMilliseconds, seconds, minutes }
}
