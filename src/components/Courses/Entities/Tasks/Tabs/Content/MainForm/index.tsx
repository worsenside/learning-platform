import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'
import { Button, TextArea, TextInput } from 'UI'
import { ButtonStyles } from 'UI/Button/types'

import { MainTabFormState } from 'containers/Courses/Entities/Tasks/Tabs/Content/MainForm'

import cl from './style.module.scss'

interface MainFormTabProps {
	errors: FieldErrors<MainTabFormState>
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<MainTabFormState>
}

const MainFormTab: FC<MainFormTabProps> = ({
	control,
	onSubmit,
	errors,
	onChange
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Здесь вы можете указать информацию по заданию</span>
		</div>
		<form onSubmit={onSubmit} noValidate className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="name">Название *</label>
					<p className={cl.caption}>
						Добавьте название заданию и ученикам будет легче ориентироваться по
						материалам Курса.
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

export default MainFormTab
