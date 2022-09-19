import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath, UseFormWatch } from 'react-hook-form'
import { MainTabFormState } from 'containers/Courses/Tabs/Content/MainForm'
import { Checkbox, TextInput, PhoneInput, EmailInput } from 'UI'

import { DevTool } from '@hookform/devtools'
import cl from './style.module.scss'

interface FeedbackMethodsProps {
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	control: Control<MainTabFormState>
	watch: UseFormWatch<MainTabFormState>
	errors: FieldErrors<MainTabFormState>
}

const FeedbackMethods: FC<FeedbackMethodsProps> = ({
	onChange,
	control,
	watch,
	errors
}) => (
	<div className={cl.container}>
		<p className={cl.caption}>
			Укажите способы связи, по которым ученик сможет задать возникший в
			процессе прохождения курса вопрос. Эта информация будет видна под уроком,
			заданием и тестированием, а также во вкладке «О курсе»
		</p>
		<div className={cl.inputGroup}>
			<Checkbox
				id="communicationsSettings.condition.isActive"
				name="communicationsSettings.condition.isActive"
				onChange={onChange('communicationsSettings.condition.isActive')}
				labelTitle="Указать условия для связи"
				control={control}
			/>
			<TextInput
				name="communicationsSettings.condition.text"
				onChange={onChange('communicationsSettings.condition.text')}
				error={errors.communicationsSettings?.condition?.message}
				control={control}
				disabled={!watch('communicationsSettings.condition.isActive')}
			/>
		</div>
		<div className={cl.inputList}>
			<div className={cl.inputGroup}>
				<Checkbox
					id="communicationsSettings.email.isActive"
					name="communicationsSettings.email.isActive"
					onChange={onChange('communicationsSettings.email.isActive')}
					control={control}
					labelTitle="Электронная почта"
				/>
				<EmailInput
					name="communicationsSettings.email.text"
					onChange={onChange('communicationsSettings.email.text')}
					error={errors.communicationsSettings?.email?.message}
					control={control}
					disabled={!watch('communicationsSettings.email.isActive')}
				/>
			</div>
			<div className={cl.inputGroup}>
				<Checkbox
					id="communicationsSettings.phone.isActive"
					name="communicationsSettings.phone.isActive"
					onChange={onChange('communicationsSettings.phone.isActive')}
					control={control}
					labelTitle="Телефон"
				/>
				<PhoneInput
					name="communicationsSettings.phone.text"
					onChange={onChange('communicationsSettings.phone.text')}
					error={errors.communicationsSettings?.phone?.message}
					control={control}
					disabled={!watch('communicationsSettings.phone.isActive')}
				/>
			</div>
		</div>
		<div className={cl.inputList}>
			<div className={cl.inputGroup}>
				<Checkbox
					id="communicationsSettings.whatsapp.isActive"
					name="communicationsSettings.whatsapp.isActive"
					onChange={onChange('communicationsSettings.whatsapp.isActive')}
					control={control}
					labelTitle="WhatsApp"
				/>
				<TextInput
					name="communicationsSettings.whatsapp.text"
					onChange={onChange('communicationsSettings.whatsapp.text')}
					error={errors.communicationsSettings?.whatsapp?.message}
					control={control}
					disabled={!watch('communicationsSettings.whatsapp.isActive')}
				/>
			</div>
			<div className={cl.inputGroup}>
				<Checkbox
					id="communicationsSettings.telegram.isActive"
					name="communicationsSettings.telegram.isActive"
					onChange={onChange('communicationsSettings.telegram.isActive')}
					control={control}
					labelTitle="Telegram"
				/>
				<TextInput
					name="communicationsSettings.telegram.text"
					onChange={onChange('communicationsSettings.telegram.text')}
					error={errors.communicationsSettings?.telegram?.message}
					control={control}
					disabled={!watch('communicationsSettings.telegram.isActive')}
				/>
			</div>
		</div>
		<div className={cl.inputList}>
			<div className={cl.inputGroup}>
				<Checkbox
					id="communicationsSettings.instagram.isActive"
					name="communicationsSettings.instagram.isActive"
					onChange={onChange('communicationsSettings.instagram.isActive')}
					control={control}
					labelTitle="Instagram"
				/>
				<TextInput
					name="communicationsSettings.instagram.text"
					onChange={onChange('communicationsSettings.instagram.text')}
					error={errors.communicationsSettings?.instagram?.message}
					control={control}
					disabled={!watch('communicationsSettings.instagram.isActive')}
				/>
			</div>
			<div className={cl.inputGroup}>
				<Checkbox
					id="communicationsSettings.vk.isActive"
					name="communicationsSettings.vk.isActive"
					onChange={onChange('communicationsSettings.vk.isActive')}
					control={control}
					labelTitle="Вконтакте"
				/>
				<TextInput
					name="communicationsSettings.vk.text"
					onChange={onChange('communicationsSettings.vk.text')}
					error={errors.communicationsSettings?.vk?.message}
					control={control}
					disabled={!watch('communicationsSettings.vk.isActive')}
				/>
			</div>
			<DevTool control={control} />
		</div>
	</div>
)

export default FeedbackMethods
