import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { LimitationsTabFormState } from 'containers/Courses/Entities/Lessons/Tabs/Content/LimitationsForm'
import { Button, RadioGroup } from 'UI'
import { ButtonStyles } from 'UI/Button/types'

import cl from '../style.module.scss'

interface LimitationsFormTabProps {
	errors: FieldErrors<LimitationsTabFormState>
	onChange: (name: FieldPath<LimitationsTabFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<LimitationsTabFormState>
}

const LimitationsFormTab: FC<LimitationsFormTabProps> = ({
	errors,
	onChange,
	control,
	onSubmit
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>
				Вы можете установить ограничения на время добавления ответа к заданию.
			</span>
		</div>
		<form noValidate onSubmit={onSubmit} className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label>Урок является обязательным</label>
					<RadioGroup
						name="lessonResponsibilityStatus"
						itemsList={[
							{
								id: '1',
								value: '1',
								labelTitle: 'Да'
							},
							{
								id: '2',
								value: '2',
								labelTitle: 'Нет'
							}
						]}
						control={control}
						onChange={onChange('lessonResponsibilityStatus')}
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
		</form>
	</div>
)

export default LimitationsFormTab
