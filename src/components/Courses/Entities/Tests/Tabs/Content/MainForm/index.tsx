import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { MainTabFormState } from 'containers/Courses/Entities/Tests/Tabs/Content/MainForm'
import { Button, RadioGroup, TextArea, TextInput } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import ValidateNotify from 'UI/Input/ValidateNotify'

import cl from './style.module.scss'

interface MainFormTabProps {
	errors: FieldErrors<MainTabFormState>
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<MainTabFormState>
}

const MainForm: FC<MainFormTabProps> = ({
	control,
	onSubmit,
	errors,
	onChange
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Здесь вы можете указать информацию по тестированию</span>
		</div>
		<form onSubmit={onSubmit} noValidate className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="">Тип тестирования *</label>
					<RadioGroup
						itemsList={[
							{
								id: '1',
								value: '1',
								labelTitle: 'Промежуточное'
							},
							{
								id: '2',
								value: '2',
								labelTitle: 'Итоговое'
							}
						]}
						name="type"
						control={control}
						onChange={onChange('type')}
					/>
					<ValidateNotify
						className={cl.validateNotify}
						error={errors.type?.message}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="name">Название *</label>
					<p className={cl.caption}>
						Добавьте название тестированию и ученикам будет легче
						ориентироваться по материалам Курса.
					</p>
					<TextInput
						error={errors.name?.message}
						name="name"
						id="name"
						onChange={onChange('name')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="description">Информация</label>
					<TextArea
						error={errors.description?.message}
						name="description"
						id="description"
						onChange={onChange('description')}
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
		</form>
	</div>
)

export default MainForm
