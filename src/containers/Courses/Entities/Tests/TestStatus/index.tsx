import React, { useCallback, useEffect, useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'

import { Select } from 'UI'
import { IOption, SelectBorderStyles, SelectSizeStyles } from 'UI/Select/types'
import { ITest } from 'types/models/test.model'

import cl from './style.module.scss'

interface TestStatusFormState extends Pick<ITest, 'isActive'> {}

const TestStatus = () => {
	const [testStatus, setTestStatus] = useState<number>()
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
	const { register, setValue, control } = useForm<TestStatusFormState>()

	useEffect(() => {
		register('isActive')
	}, [])

	useEffect(() => {
		setValue('isActive', 1)
	})

	// TODO rtk for change status and border color
	const changeHandler = useCallback(
		(name: FieldPath<TestStatusFormState>) => (value: any) => {
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

export default TestStatus
