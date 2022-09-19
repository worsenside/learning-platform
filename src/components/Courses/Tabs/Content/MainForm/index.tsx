import React, { FC, FormEvent } from 'react'
import {
	Control,
	FieldErrors,
	FieldPath,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'

import {
	Button,
	TextInput,
	RadioGroup,
	Select,
	Switch,
	Tags,
	TextArea,
	DragAndDrop,
	Datepicker
} from 'UI'
import { AcceptTypes, SizeTypes } from 'UI/DragAndDrop/types'
import { IOption } from 'UI/Select/types'
import { ButtonStyles } from 'UI/Button/types'
import { ITag } from 'UI/Tags/types'
import CertificateConfig from 'containers/Courses/Tabs/Content/MainForm/CertificateSettings'
import FeedbackMethods from 'components/Courses/Tabs/Content/MainForm/FeedbackMethods'
import { MainTabFormState } from 'containers/Courses/Tabs/Content/MainForm'
import CorporateSettings from './CorporateSettings'

import cl from './style.module.scss'
import ValidateNotify from '../../../../../UI/Input/ValidateNotify'

interface MainFormTabProps {
	errors: FieldErrors<MainTabFormState>
	onChange: (name: FieldPath<MainTabFormState>) => (value: any) => void
	onSubmit: (event: FormEvent) => void
	getValues: UseFormGetValues<MainTabFormState>
	setValue: UseFormSetValue<MainTabFormState>
	control: Control<MainTabFormState>
	tagsList: ITag[]
	watch: UseFormWatch<MainTabFormState>
	studyFormOptionsList: IOption[]
}

const MainFormTab: FC<MainFormTabProps> = ({
	errors,
	onChange,
	tagsList,
	getValues,
	setValue,
	control,
	onSubmit,
	studyFormOptionsList,
	watch
}) => (
	<div className={cl.container}>
		<div className={cl.header}>
			<span>На этой странице вы можете изменить основные свойства курса.</span>
		</div>
		<form noValidate onSubmit={onSubmit} className={cl.form}>
			<div className={cl.inputs}>
				<div className={cl.inputContainer}>
					<label htmlFor="name">Название *</label>
					<TextInput
						error={errors.name?.message}
						name="name"
						id="name"
						onChange={onChange('name')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="description">Описание</label>
					<TextArea
						error={errors.description?.message}
						name="description"
						id="description"
						onChange={onChange('description')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="cover">Обложка</label>
					<DragAndDrop
						name="cover"
						id="drag-image"
						control={control}
						previewUrl={getValues('coverUrl')}
						onChange={onChange('cover')}
						size={[12, SizeTypes.MB]}
						accept={[AcceptTypes.JPG, AcceptTypes.JPEG, AcceptTypes.PNG]}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label>Направления</label>
					<Tags
						name="directionsIdList"
						tagsList={tagsList}
						onChange={onChange('directionsIdList')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="certification">Сертификация</label>
					<CertificateConfig
						setValue={setValue}
						control={control}
						onChange={onChange}
						watch={watch}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label>Отзыв о курсе</label>
					<RadioGroup
						name="reviewResponsibilityStatus"
						itemsList={[
							{
								id: '1',
								value: '1',
								labelTitle:
									'Ученик должен отставить отзыв, чтобы получить сертификат'
							},
							{
								id: '2',
								value: '2',
								labelTitle: 'Ученик оставляет отзыв по желанию'
							}
						]}
						control={control}
						onChange={onChange('reviewResponsibilityStatus')}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label>Способы связи *</label>
					<FeedbackMethods
						errors={errors}
						control={control}
						onChange={onChange}
						watch={watch}
					/>
				</div>
				<div className={cl.splitLine} />
				<div className={cl.inputContainer}>
					<label htmlFor="marketplaceSettings.isActive">
						Размещение на маркетплейсе
					</label>
					<Switch
						id="marketplaceSettings.isActive"
						name="marketplaceSettings.isActive"
						control={control}
						onChange={onChange('marketplaceSettings.isActive')}
						labelTitle="Опубликовать курс на маркетплейсе"
					/>
					<div className={cl.marketplaceDesc}>
						<p className={cl.caption}>
							Курс появится на Вашей странице в маркетплейсе и будет доступен
							всем пользователям для обучения.
						</p>
						<p className={cl.caption}>
							Если хотите сделать частный курс, оставьте параметр выключенным
						</p>
					</div>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="marketplaceSettings.priceSettings.isActive">
						Стоимость курса *
					</label>
					<Switch
						id="marketplaceSettings.priceSettings.isActive"
						name="marketplaceSettings.priceSettings.isActive"
						onChange={onChange('marketplaceSettings.priceSettings.isActive')}
						control={control}
						labelTitle="Указать стоимость курса, руб"
					/>
					<TextInput
						disabled={!watch('marketplaceSettings.priceSettings.isActive')}
						error={errors.marketplaceSettings?.priceSettings?.price?.message}
						onChange={onChange('marketplaceSettings.priceSettings.price')}
						control={control}
						name="marketplaceSettings.priceSettings.price"
					/>
				</div>
				<div className={cl.inputContainer}>
					<label>Формат обучения</label>
					<Select
						name="marketplaceSettings.studyFormatId"
						onChange={onChange('marketplaceSettings.studyFormatId')}
						control={control}
						optionsList={studyFormOptionsList}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="marketplaceSettings.dateLearningSettings.isActive">
						Срок обучения на курсе
					</label>
					<Switch
						id="marketplaceSettings.dateLearningSettings.isActive"
						name="marketplaceSettings.dateLearningSettings.isActive"
						onChange={onChange(
							'marketplaceSettings.dateLearningSettings.isActive'
						)}
						control={control}
						labelTitle="Указать дату начала и завершения обучения"
					/>
					<div className={cl.datepickerContainer}>
						<Datepicker
							control={control}
							name="marketplaceSettings.dateLearningSettings.start"
							disabled={
								!watch('marketplaceSettings.dateLearningSettings.isActive')
							}
						/>
						<Datepicker
							control={control}
							name="marketplaceSettings.dateLearningSettings.end"
							disabled={
								!watch('marketplaceSettings.dateLearningSettings.isActive')
							}
						/>
					</div>
					<ValidateNotify
						className={cl.validateNotify}
						error={
							errors.marketplaceSettings?.dateLearningSettings?.start
								?.message ||
							errors.marketplaceSettings?.dateLearningSettings?.end?.message
						}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="marketplaceSettings.announcementDescription">
						Анонс
					</label>
					<p className={cl.caption}>
						Текст будет отображаться на маркетплейсе в обложке курса, вместе с
						его названием.
					</p>
					<TextArea
						id="marketplaceSettings.announcementDescription"
						name="marketplaceSettings.announcementDescription"
						error={errors.marketplaceSettings?.announcementDescription?.message}
						onChange={onChange('marketplaceSettings.announcementDescription')}
						control={control}
						placeholder="Выполнение всех этих условий труда обеспечивает необходимую безопасность на производстве, создание рациональных и комфортных условий труда на рабочих местах, снижение травматизма и профессиональных заболеваний, повышению производительности труда и сохранение здоровья."
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="result">Результат</label>
					<p className={cl.caption}>
						Укажите какой документ выдается по завершению курса
					</p>
					<TextInput
						id="marketplaceSettings.documentNameAfterLearning"
						name="marketplaceSettings.documentNameAfterLearning"
						error={
							errors.marketplaceSettings?.documentNameAfterLearning?.message
						}
						onChange={onChange('marketplaceSettings.documentNameAfterLearning')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<label htmlFor="employment">Трудоустройство</label>
					<TextArea
						id="marketplaceSettings.employmentDescription"
						name="marketplaceSettings.employmentDescription"
						error={errors.marketplaceSettings?.employmentDescription?.message}
						onChange={onChange('marketplaceSettings.employmentDescription')}
						control={control}
					/>
				</div>
				<div className={cl.inputContainer}>
					<CorporateSettings
						control={control}
						onChange={onChange}
						watch={watch}
						errors={errors}
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
