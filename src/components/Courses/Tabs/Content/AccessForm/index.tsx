import React, { FC, memo } from 'react'
import {
	Control,
	FieldErrors,
	FieldPath,
	UseFormGetValues,
	UseFormSetValue
} from 'react-hook-form'
import { isEqual } from 'lodash'

import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import EmployersSelect from 'containers/Courses/Tabs/Content/AccessForm/EmployersSelect'
import { AccessFormState } from 'containers/Courses/Tabs/Content/AccessForm'
import { IOption } from 'UI/Select/types'

import cl from './style.module.scss'

export interface AccessFormTabProps {
	errors: FieldErrors<AccessFormState>
	onChange: (name: FieldPath<AccessFormState>) => (value: any) => void
	setValue: UseFormSetValue<AccessFormState>
	control: Control<AccessFormState>
	employersOptionsList: IOption[]
	onSubmit: () => void
}

const AccessFormTab: FC<AccessFormTabProps> = ({
	errors,
	onChange,
	control,
	setValue,
	employersOptionsList,
	onSubmit
}) => (
	<form noValidate onSubmit={onSubmit} className={cl.container}>
		<div className={cl.header}>
			<span>В этом разделе вы можете назначить ответственных за курс.</span>
		</div>
		<div className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="">Преподаватель</label>
					<EmployersSelect
						setValue={setValue}
						name="teachersIdList"
						errors={errors}
						employersOptionsList={employersOptionsList}
						onChange={onChange}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="">Куратор</label>
					<EmployersSelect
						setValue={setValue}
						name="curatorsIdList"
						errors={errors}
						onChange={onChange}
						employersOptionsList={employersOptionsList}
						control={control}
					/>
				</div>
				<div className={cl.splitLine} />
			</div>
			<div className={cl.buttons}>
				<Button styleTypes={[ButtonStyles.OUTLINE_PRIMARY, ButtonStyles.ROUND]}>
					Отменить изменения
				</Button>
				<Button
					type="submit"
					styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				>
					Сохранить изменения
				</Button>
			</div>
		</div>
	</form>
)

export default memo(AccessFormTab, (prevProps, nextProps) =>
	isEqual(prevProps.employersOptionsList, nextProps.employersOptionsList)
)
