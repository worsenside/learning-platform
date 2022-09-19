import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'

import { MainTabFormState } from 'containers/Courses/Entities/Lessons/Tabs/Content/MainForm'
import { Button, DragAndDrop, TextArea, TextInput } from 'UI'
import { AcceptTypes, SizeTypes } from 'UI/DragAndDrop/types'
import { ButtonStyles } from 'UI/Button/types'

import cl from '../style.module.scss'

interface MainFormTabProps {
	errors: FieldErrors<MainTabFormState>
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<MainTabFormState>
}

const MainFormTab: FC<MainFormTabProps> = ({
	errors,
	onChange,
	control,
	onSubmit
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Здесь вы можете указать информацию по уроку.</span>
		</div>
		<form noValidate onSubmit={onSubmit} className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="name">Название *</label>
					<p className={cl.caption}>
						Добавьте название уроку и ученикам будет легче ориентироваться по
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
				{/* TODO переделать accepted types */}
				<div className={cl.inputContainer}>
					<label htmlFor="mediaFiles">Загрузить видео или аудио файл</label>
					<DragAndDrop
						multiple
						name="mediaFiles"
						id="mediaFiles"
						control={control}
						onChange={onChange('mediaFiles')}
						size={[12, SizeTypes.MB]}
						accept={[AcceptTypes.JPG, AcceptTypes.JPEG, AcceptTypes.PNG]}
					/>
				</div>
				{/* TODO переделать accepted types */}
				<div className={cl.inputContainer}>
					<label htmlFor="docsFiles">Загрузить учебные материалы</label>
					<DragAndDrop
						multiple
						name="docsFiles"
						id="docsFiles"
						control={control}
						onChange={onChange('docsFiles')}
						size={[12, SizeTypes.MB]}
						accept={[AcceptTypes.JPG, AcceptTypes.JPEG, AcceptTypes.PNG]}
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
