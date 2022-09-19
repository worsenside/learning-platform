import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import classnames from 'classnames'
import DatePickerBaseComponent from 'react-datepicker'

import cl from './style.module.scss'

interface DatePickerProps {
	control: Control<any>
	name: string
	disabled?: boolean
}

const DatePicker: FC<DatePickerProps> = ({ control, name, disabled }) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<DatePickerBaseComponent
				disabled={disabled}
				className={classnames([cl.datepickerContainer], {
					[cl.datepickerContainerDisabled]: disabled
				})}
				placeholderText="Выберите дату"
				selected={field.value}
				onChange={(date) => field.onChange(date)}
			/>
		)}
	/>
)

export default DatePicker
