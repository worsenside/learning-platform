import React, { FC } from 'react'
import { Control, FieldErrors, FieldPath, UseFormWatch } from 'react-hook-form'

import { EmailInput, PhoneInput, Switch } from 'UI'
import { MainTabFormState } from 'containers/Courses/Tabs/Content/MainForm'

import cl from '../style.module.scss'

interface CorporateSettingsProps {
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	control: Control<MainTabFormState>
	watch: UseFormWatch<MainTabFormState>
	errors: FieldErrors<MainTabFormState>
}

const CorporateSettings: FC<CorporateSettingsProps> = ({
	control,
	watch,
	onChange,
	errors
}) => (
	<>
		<label htmlFor="marketplaceSettings.corporateLearningSettings.isActive">
			Корпоративное обучение
		</label>
		<Switch
			id="marketplaceSettings.corporateLearningSettings.isActive"
			name="marketplaceSettings.corporateLearningSettings.isActive"
			control={control}
			onChange={onChange(
				'marketplaceSettings.corporateLearningSettings.isActive'
			)}
			labelTitle="Сделать курс доступным для корп.обучения юр.лицам"
		/>
		<p className={cl.caption}>
			Курс появится на Вашей странице в маркетплейсе и будет доступен всем
			пользователям для обучения
		</p>
		<EmailInput
			disabled={
				!watch('marketplaceSettings.corporateLearningSettings.isActive')
			}
			error={
				errors.marketplaceSettings?.corporateLearningSettings?.email?.message
			}
			onChange={onChange('marketplaceSettings.corporateLearningSettings.email')}
			control={control}
			name="marketplaceSettings.corporateLearningSettings.email"
		/>
		<PhoneInput
			disabled={
				!watch('marketplaceSettings.corporateLearningSettings.isActive')
			}
			error={
				errors.marketplaceSettings?.corporateLearningSettings?.phone?.message
			}
			onChange={onChange('marketplaceSettings.corporateLearningSettings.phone')}
			control={control}
			name="marketplaceSettings.corporateLearningSettings.phone"
		/>
	</>
)

export default CorporateSettings
