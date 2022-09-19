import React, { FC, FormEvent } from 'react'
import {
	Control,
	FieldErrors,
	FieldPath,
	UseFormGetValues
} from 'react-hook-form'

import { Button, DragAndDrop, TextArea, TextInput } from 'UI'

import { AcceptTypes, SizeTypes } from 'UI/DragAndDrop/types'
import { ButtonStyles } from 'UI/Button/types'

import { SchoolProfileFormState } from 'containers/PersonalSchool/Profile/Form.container'

import cl from './style.module.scss'

interface SchoolProfileFormProps {
	errors: FieldErrors<SchoolProfileFormState>
	onChange: (name: FieldPath<SchoolProfileFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	getValues: UseFormGetValues<SchoolProfileFormState>
	control: Control<SchoolProfileFormState>
}

const SchoolForm: FC<SchoolProfileFormProps> = ({
	errors,
	onChange,
	getValues,
	control,
	onSubmit
}) => (
	<>
		<form noValidate onSubmit={onSubmit} className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="drag-image">Ваша фотография</label>
					<DragAndDrop
						id="drag-image"
						control={control}
						name="avatar"
						previewUrl={getValues('avatarUrl')}
						onChange={onChange('avatar')}
						size={[12, SizeTypes.MB]}
						accept={[AcceptTypes.JPG, AcceptTypes.JPEG, AcceptTypes.PNG]}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="name">Название *</label>
					<TextInput
						id="name"
						name="name"
						error={errors?.name?.message}
						onChange={onChange('name')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="description">Описание *</label>
					<TextArea
						id="description"
						name="description"
						error={errors?.description?.message}
						placeholder="Расскажите о школе, её преимуществах и особенностях"
						onChange={onChange('description')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="siteUrl">Сайт*</label>
					<TextInput
						id="siteUrl"
						name="websiteUrl"
						error={errors.websiteUrl?.message}
						placeholder="https://"
						onChange={onChange('websiteUrl')}
						control={control}
					/>
				</div>
				<div className={cl.splitLine} />
			</div>
			<div className={cl.buttonsContainer}>
				<Button styleTypes={[ButtonStyles.ROUND, ButtonStyles.OUTLINE_PRIMARY]}>
					Отменить изменения
				</Button>
				<Button
					type="submit"
					styleTypes={[ButtonStyles.ROUND, ButtonStyles.PRIMARY]}
				>
					Сохранить изменения
				</Button>
			</div>
		</form>
	</>
)

export default SchoolForm
