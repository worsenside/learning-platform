import React, { FC, FormEvent } from 'react'
import { Control, FieldErrors, FieldPath, UseFormWatch } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Button, Datepicker, RadioGroup, Switch, TextInput } from 'UI'
import { ButtonStyles } from 'UI/Button/types'
import { LimitationsTabFormState } from 'containers/Courses/Entities/Tasks/Tabs/Content/LimitationsForm'
import ValidateNotify from 'UI/Input/ValidateNotify'

import cl from './style.module.scss'

interface LimitationsFormTabProps {
	errors: FieldErrors<LimitationsTabFormState>
	onChange: (name: FieldPath<LimitationsTabFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	control: Control<LimitationsTabFormState>
	watch: UseFormWatch<LimitationsTabFormState>
}

const LimitationsFormTab: FC<LimitationsFormTabProps> = ({
	control,
	errors,
	onChange,
	onSubmit,
	watch
}) => (
	<>
		<DevTool control={control} />
		<div className={cl.container}>
			<div className={cl.header}>
				<span>
					Вы можете установить ограничения на время добавления ответа к заданию
				</span>
			</div>
			<form onSubmit={onSubmit} noValidate className={cl.form}>
				<div className={cl.inputs}>
					<div className={cl.inputContainer}>
						<label>Задание является обязательным</label>
						<RadioGroup
							itemsList={[
								{ id: '1', value: 1, labelTitle: 'Да' },
								{ id: '2', value: 2, labelTitle: 'Нет' }
							]}
							name="taskResponsibilityStatus"
							defaultValue={1}
							control={control}
							onChange={onChange('taskResponsibilityStatus')}
						/>
					</div>
					<div className={cl.inputContainerSplit}>
						<label htmlFor="passingScore">Проходной балл</label>
						<div className={cl.textInputSplitContainer}>
							<TextInput
								error={errors.passingScore?.message}
								placeholder="Кол-во баллов"
								onChange={onChange('passingScore')}
								control={control}
								type="number"
								name="passingScore"
								id="passingScore"
							/>
							<span>из 10 баллов</span>
						</div>
					</div>
					<div className={cl.inputContainerSplit}>
						<label htmlFor="passingScore">Кол-во попыток для прохождения</label>
						<div className={cl.textInputSplitContainerAttempts}>
							<TextInput
								error={errors.countAttempts?.message}
								placeholder="Кол-во попыток"
								onChange={onChange('countAttempts')}
								control={control}
								type="number"
								name="countAttempts"
								id="countAttempts"
							/>
							<div className={cl.attemptsInfo}>
								<span>5 — по умолчанию,</span>
								<span>10 — максимум;</span>
							</div>
						</div>
					</div>
					<div className={cl.inputContainer}>
						<label>Ограничение по прохождению</label>
						<Switch
							name="datePassStartSettings.isActive"
							onChange={onChange('datePassStartSettings.isActive')}
							control={control}
							labelTitle="Разрешить выполнение задания с"
						/>
						<div className={cl.datepickerContainer}>
							<Datepicker
								control={control}
								name="datePassStartSettings.start"
								disabled={!watch('datePassStartSettings.isActive')}
							/>
							<Datepicker
								control={control}
								name="datePassStartSettings.end"
								disabled={!watch('datePassStartSettings.isActive')}
							/>
						</div>
						<ValidateNotify
							className={cl.validateError}
							error={
								errors.datePassStartSettings?.start?.message ||
								errors.datePassStartSettings?.end?.message
							}
						/>
						<Switch
							name="datePassEndSettings.isActive"
							onChange={onChange('datePassEndSettings.isActive')}
							control={control}
							labelTitle="Последний срок сдачи"
						/>
						<div className={cl.datepickerContainer}>
							<Datepicker
								control={control}
								name="datePassEndSettings.start"
								disabled={!watch('datePassEndSettings.isActive')}
							/>
							<Datepicker
								control={control}
								name="datePassEndSettings.end"
								disabled={!watch('datePassEndSettings.isActive')}
							/>
						</div>
						<ValidateNotify
							className={cl.validateError}
							error={
								errors.datePassEndSettings?.start?.message ||
								errors.datePassEndSettings?.end?.message
							}
						/>
					</div>
					<div className={cl.splitLine} />
				</div>
				<div className={cl.buttons}>
					<Button
						styleTypes={[ButtonStyles.OUTLINE_PRIMARY, ButtonStyles.ROUND]}
					>
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
	</>
)

export default LimitationsFormTab
