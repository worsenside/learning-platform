import React, { FC, useCallback, useEffect, useRef } from 'react'
import { Control, useForm, UseFormWatch, useWatch } from 'react-hook-form'
import isNil from 'lodash/isNil'

import { TextInput } from 'UI'
import { getMillisecondsFromTime } from 'helpers/getMillisecondsFromTime'
import { TimeValue } from './types'

interface TimeLimitProps {
	control: Control<any>
	name: string
	watch: UseFormWatch<any>
	onChange: (value: any) => void
}

const TimeLimit: FC<TimeLimitProps> = ({ control, name, watch, onChange }) => {
	const HOURS_LIMIT = 24
	const prevTime = useRef<number>(0)
	const value = useWatch({ control, name, defaultValue: 6000 })
	const {
		control: timeLimitControl,
		setValue,
		watch: timeLimitWatch
	} = useForm<TimeValue>()

	const milliseconds = timeLimitWatch('milliseconds')

	useEffect(() => {
		if (!milliseconds) {
			return
		}
		onChange(milliseconds)
	}, [milliseconds])

	useEffect(() => {
		const time = getMillisecondsFromTime(value)
		if (prevTime.current && time.milliseconds === prevTime.current) {
			return
		}
		setValue('milliseconds', time.milliseconds)
		setValue('hours', time.hours)
		setValue('minutes', time.minutes)
		setValue('seconds', time.seconds)
		onChange(time.milliseconds)
		prevTime.current = time.milliseconds
	}, [value])
	const changeHoursHandler = useCallback(
		(hoursValue: string) => {
			if (isNil(milliseconds)) {
				return
			}
			let limit = +hoursValue
			if (+hoursValue > HOURS_LIMIT) {
				limit = 24
			}
			const { milliseconds: tmpMilliseconds, hours } = getMillisecondsFromTime(
				milliseconds,
				{
					hours: limit
				}
			)
			setValue('hours', hours)
			setValue('milliseconds', tmpMilliseconds)
		},
		[milliseconds]
	)
	const changeMinutesHandler = useCallback(
		(minutesValue: string) => {
			if (isNil(milliseconds)) {
				return
			}
			let limit = +minutesValue
			if (+minutesValue > 60) {
				limit = 59
			}

			const { milliseconds: tmpMilliseconds, minutes } =
				getMillisecondsFromTime(milliseconds, {
					minutes: limit
				})

			setValue('minutes', minutes)
			setValue('milliseconds', tmpMilliseconds)
		},
		[milliseconds]
	)
	const changeSecondsHandler = useCallback(
		(secondsValue: string) => {
			if (isNil(milliseconds)) {
				return
			}
			let limit = +secondsValue
			if (+secondsValue > 60) {
				limit = 59
			}

			const { milliseconds: tmpMilliseconds, seconds } =
				getMillisecondsFromTime(milliseconds, {
					seconds: limit
				})
			setValue('seconds', seconds)
			setValue('milliseconds', tmpMilliseconds)
		},
		[milliseconds]
	)

	return (
		<>
			<TextInput
				disabled={!watch('passingTimeLimit.isActive')}
				onChange={changeHoursHandler}
				control={timeLimitControl}
				name="hours"
				type="number"
				placeholder="Часы"
			/>
			<TextInput
				disabled={!watch('passingTimeLimit.isActive')}
				onChange={changeMinutesHandler}
				control={timeLimitControl}
				name="minutes"
				type="number"
				placeholder="Минуты"
			/>
			<TextInput
				disabled={!watch('passingTimeLimit.isActive')}
				onChange={changeSecondsHandler}
				control={timeLimitControl}
				name="seconds"
				type="number"
				placeholder="Секунды"
			/>
		</>
	)
}
export default TimeLimit
