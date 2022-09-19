import React, { useCallback, useEffect, useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import { Select } from 'UI'
import { IOption, SelectBorderStyles, SelectSizeStyles } from 'UI/Select/types'
import { ILesson } from 'types/models/lesson.model'

import cl from './style.module.scss'

interface LessonStatusFormState extends Pick<ILesson, 'isActive'> {}

const LessonStatus = () => {
	const [lessonStatus, setLessonStatus] = useState<number>()
	const [statusOptionList, setStatusOptionList] = useState<IOption[]>([
		{
			value: 1,
			text: 'Активный'
		},
		{
			value: 2,
			text: 'Неактивный'
		}
	])
	const { register, setValue, control } = useForm<LessonStatusFormState>()

	useEffect(() => {
		register('isActive')
	}, [])

	useEffect(() => {
		setValue('isActive', 2)
	})

	// TODO rtk for change status and border color
	const changeHandler = useCallback(
		(name: FieldPath<LessonStatusFormState>) => (value: any) => {
			setValue(name, value)
		},
		[]
	)

	return (
		<Select
			className={cl.statusSelect}
			styleTypes={[SelectSizeStyles.SMALL, SelectBorderStyles.ROUND]}
			control={control}
			onChange={changeHandler('isActive')}
			name="isActive"
			optionsList={statusOptionList}
		/>
	)
}

export default LessonStatus
