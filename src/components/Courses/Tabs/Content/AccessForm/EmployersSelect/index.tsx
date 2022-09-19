import React, { FC } from 'react'
import { UseFieldArrayRemove } from 'react-hook-form'

import { Button, Select } from 'UI'
import { ButtonSizes, ButtonStyles } from 'UI/Button/types'
import { IOption } from 'UI/Select/types'
import { EmployersSelectProps as EmployersSelectContainerProps } from 'containers/Courses/Tabs/Content/AccessForm/EmployersSelect'

import plusIconSrc from 'UI/Button/images/plus-green.svg'

import cl from '../style.module.scss'

interface EmployersSelectProps
	extends Omit<EmployersSelectContainerProps, 'getValues'> {
	employersOptionsList: IOption[]
	onAppend: () => void
	appendButtonIsDisabled: boolean
	fields: Record<'id', string>[]
	remove: UseFieldArrayRemove
}

const EmployersSelect: FC<EmployersSelectProps> = ({
	employersOptionsList,
	control,
	onChange,
	name,
	remove,
	onAppend,
	appendButtonIsDisabled,
	fields
}) => (
	<>
		{fields.map((field, index) => (
			<div className={cl.selectContainer} key={field.id}>
				<Select
					className={cl.selectWidth}
					optionsList={employersOptionsList}
					onChange={onChange(`${name}.${index}`)}
					control={control}
					name={`${name}.${index}`}
				/>
				<button onClick={() => remove(index)}>DEL</button>
			</div>
		))}
		<Button
			onClick={onAppend}
			disabled={appendButtonIsDisabled}
			styleTypes={[
				ButtonStyles.ROUND,
				ButtonStyles.OUTLINE_PRIMARY,
				ButtonSizes.SMALL
			]}
		>
			<img src={plusIconSrc} alt="plus" />
			Добавить {name === 'teachersIdList' ? 'преподавателя' : 'куратора'}
		</Button>
	</>
)

export default EmployersSelect
