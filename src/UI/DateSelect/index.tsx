import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { Control, useWatch, useForm } from 'react-hook-form'
import isNil from 'lodash/isNil'

import { getOptionsListFromArray, getAmountDaysByMonth } from 'helpers'

import { Select } from 'UI'
import { Constants } from 'types'
import { IOption } from 'UI/Select/types'
import { MonthList, DateValue } from './types'

import cl from './style.module.scss'

interface DateSelectProps {
	onChange: (value: Date) => void
	name: string
	control: Control<any>
}

const DateSelect: FC<DateSelectProps> = ({ onChange, name, control }) => {
	const prevDate = useRef<Date>()
	const value: Date = useWatch({
		control,
		name,
		defaultValue: new Date()
	})
	const { control: dateSelectControl, setValue, watch } = useForm<DateValue>({})

	const date = watch('date')
	const year = watch('year')
	const month = watch('month')
	const day = watch('day')

	const yearsList = useMemo(() => {
		const currentYear = new Date().getFullYear()

		return Array(Constants.YEAR_LIST_LIMIT)
			.fill(true)
			.map((_, index) => currentYear - index)
	}, [])

	useEffect(() => {
		if (!date) {
			return
		}

		onChange(date)
	}, [date])

	useEffect(() => {
		const currentYear = new Date(value).getFullYear()
		const currentMonth = new Date(value).getMonth() || 0
		const currentDay = new Date(value).getDate() || 1
		const currentDate = new Date(currentYear, currentMonth, currentDay)

		if (prevDate.current && +new Date(value) === +new Date(prevDate.current)) {
			return
		}

		setValue('date', currentDate)
		setValue('year', currentYear)
		setValue('month', currentMonth)
		setValue('day', currentDay)

		onChange(currentDate)
		prevDate.current = currentDate
	}, [value])

	const daysOptionsList = useMemo(() => {
		if (isNil(year) || year < 0 || isNil(month) || month < 0) {
			return []
		}

		const daysAmount = getAmountDaysByMonth(year, month)

		return getOptionsListFromArray(
			Array(daysAmount)
				.fill(true)
				.map((_, index) => index + 1),
			true
		)
	}, [year, month])

	const monthsOptionsList = useMemo(
		() => getOptionsListFromArray(Object.values(MonthList)),
		[]
	)
	const yearsOptionsList = useMemo(
		() => getOptionsListFromArray(yearsList, true),
		[yearsList]
	)

	const changeDayHandler = useCallback(
		(dayValue: IOption['value']) => {
			if (!date || isNil(dayValue) || dayValue <= 0) {
				return
			}

			setValue('day', +dayValue)

			const tempDate = date
			tempDate.setDate(+dayValue)
			setValue('date', tempDate)
		},
		[date]
	)

	const changeMonthHandler = useCallback(
		(monthValue: IOption['value']) => {
			if (!date || isNil(monthValue) || monthValue < 0) {
				return
			}

			setValue('month', +monthValue)

			const tempDate = date

			const daysAmount = getAmountDaysByMonth(date.getFullYear(), +monthValue)
			if (daysAmount < date.getDate()) {
				tempDate.setDate(daysAmount)
			}

			tempDate.setMonth(+monthValue)

			setValue('date', tempDate)
		},
		[date]
	)

	const changeYearHandler = useCallback(
		(yearValue: IOption['value']) => {
			if (!date || isNil(yearValue) || yearValue < 0) {
				return
			}

			setValue('year', +yearValue)

			const tempDate = date

			const daysAmount = getAmountDaysByMonth(+yearValue, date.getMonth())
			if (daysAmount < date.getDate()) {
				tempDate.setDate(daysAmount)
			}

			tempDate.setFullYear(+yearValue)

			setValue('date', tempDate)
		},
		[date]
	)

	return (
		<div className={cl.container}>
			<Select
				name="day"
				control={dateSelectControl}
				placeholder="День"
				onChange={changeDayHandler}
				optionsList={daysOptionsList}
			/>
			<Select
				name="month"
				control={dateSelectControl}
				placeholder="Месяц"
				onChange={changeMonthHandler}
				optionsList={monthsOptionsList}
			/>
			<Select
				name="year"
				control={dateSelectControl}
				placeholder="Год"
				onChange={changeYearHandler}
				optionsList={yearsOptionsList}
			/>
		</div>
	)
}

export default DateSelect
