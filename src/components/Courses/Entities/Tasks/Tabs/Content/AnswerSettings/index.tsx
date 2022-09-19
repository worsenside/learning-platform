import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Button, Checkbox, Select } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import ValidateNotify from 'UI/Input/ValidateNotify'
import { AnswerSettingsTabFormState } from 'containers/Courses/Entities/Tasks/Tabs/Content/AnswerSettingsForm'
import cl from './style.module.scss'

interface AnswerSettingsFormTabProps {
	errors: FieldErrors<AnswerSettingsTabFormState>
	onChange: (
		name: FieldPath<AnswerSettingsTabFormState>
	) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<AnswerSettingsTabFormState>
}

const AnswerSettingsFormTab: FC<AnswerSettingsFormTabProps> = ({
	control,
	onSubmit,
	errors,
	onChange
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>Настройте в каком формате ученик должен предоставить ответ</span>
		</div>
		<form onSubmit={onSubmit} noValidate className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="name">Тип предоставляемого ответа *</label>
					<Checkbox
						onChange={onChange('answerResponsibilitiesType.isFile')}
						name="answerResponsibilitiesType.isFile"
						control={control}
						labelTitle="Ответ в виде файла"
					/>
					<Checkbox
						onChange={onChange('answerResponsibilitiesType.isText')}
						name="answerResponsibilitiesType.isText"
						control={control}
						labelTitle="Ответ в виде текста"
					/>
					<ValidateNotify
						className={cl.answerTypeError}
						error={
							errors.answerResponsibilitiesType?.isText?.message ||
							errors.answerResponsibilitiesType?.isFile?.message
						}
					/>
				</div>
				{/* TODO возможно required */}
				<div className={cl.inputContainer}>
					<label htmlFor="description">
						Максимальное число загружаемых файлов
					</label>
					<Select
						optionsList={[
							{ value: 1, text: '1' },
							{ value: 2, text: '2' },
							{ value: 10, text: '10' }
						]}
						className={cl.uploadSelect}
						onChange={onChange('maxCountUploadFiles')}
						control={control}
						name="maxCountUploadFiles"
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
		<DevTool control={control} />
	</div>
)

export default AnswerSettingsFormTab
