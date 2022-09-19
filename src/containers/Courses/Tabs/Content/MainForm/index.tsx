import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FieldPath, useForm } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'
import { MainFormTab as MainFormTabComponent } from 'components/Courses/Tabs/Content'
import { ITag } from 'UI/Tags/types'
import { PatternsType, ValidationErrorMessages } from 'types'
import { getPatterns } from 'helpers'
import { ICourse } from 'types/models/course.model'
import { CommunicationsInfoItem } from 'types/models/course.model/settings/communications.model'
import { IOption } from 'UI/Select/types'
import { useScrollToError } from 'hooks'

export interface MainTabFormState extends ICourse {
	cover?: File
}

const MainFormTab = () => {
	const [studyFormatOptionsList, setStudyFormatOptionsList] = useState<
		IOption[]
	>([
		{
			value: 1,
			text: 'Дистанционное'
		},
		{
			value: 2,
			text: 'Оффлайн'
		}
	])

	const tagsList = useMemo(
		(): ITag[] => [
			{ id: 1, text: 'IT и программирование' },
			{ id: 2, text: 'Финансовая грамотность' },
			{ id: 3, text: 'Дизайн' },
			{ id: 4, text: 'Образование' },
			{ id: 5, text: 'Маркетинг' },
			{ id: 6, text: 'Soft Skills' },
			{ id: 7, text: 'Аналитика' },
			{ id: 8, text: 'Хобби' },
			{ id: 9, text: 'Спорт и здоровье' },
			{ id: 10, text: 'Фото и видео' },
			{ id: 11, text: 'Музыка' },
			{ id: 12, text: 'Другое' }
		],
		[]
	)

	const {
		register,
		control,
		getValues,
		formState,
		setValue,
		handleSubmit,
		watch
	} = useForm<MainTabFormState>({})

	useEffect(() => {
		register('name', {
			required: ValidationErrorMessages.EMPTY,
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('description', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('coverUrl')
		register('directionsIdList')
		register('certificateSettings.isActive')
		register('certificateSettings.type')
		register('reviewResponsibilityStatus')
		const communicationsSettingsValidationCallback = (
			value: CommunicationsInfoItem
		) => {
			if (!value) {
				return true
			}
			const { text, isActive } = value
			return !isActive || !!text || ValidationErrorMessages.EMPTY
		}
		register('communicationsSettings.condition', {
			validate: communicationsSettingsValidationCallback
		})
		register('communicationsSettings.email', {
			validate: (value) => {
				if (!value) {
					return true
				}
				return communicationsSettingsValidationCallback(value) === true
					? isEmail(value.text) || ValidationErrorMessages.INCORRECT
					: communicationsSettingsValidationCallback(value)
			}
		})
		register('communicationsSettings.phone', {
			validate: communicationsSettingsValidationCallback
		})
		register('communicationsSettings.whatsapp', {
			validate: communicationsSettingsValidationCallback
		})
		register('communicationsSettings.telegram', {
			validate: communicationsSettingsValidationCallback
		})
		register('communicationsSettings.instagram', {
			validate: communicationsSettingsValidationCallback
		})
		register('communicationsSettings.vk', {
			validate: communicationsSettingsValidationCallback
		})
		register('marketplaceSettings.isActive')
		register('marketplaceSettings.priceSettings.isActive')
		register('marketplaceSettings.priceSettings.price', {
			validate: (value) =>
				!getValues('marketplaceSettings.priceSettings.isActive') ||
				!!value ||
				ValidationErrorMessages.EMPTY,
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('marketplaceSettings.studyFormatId')
		register('marketplaceSettings.dateLearningSettings.isActive')
		register('marketplaceSettings.dateLearningSettings.start', {
			validate: (value) =>
				!!(
					!getValues('marketplaceSettings.dateLearningSettings.isActive') ||
					(getValues('marketplaceSettings.dateLearningSettings.end') &&
						new Date(value).toLocaleDateString())
				) || ValidationErrorMessages.DATEPICKER_INCORRECT
		})
		register('marketplaceSettings.dateLearningSettings.end', {
			validate: (value) =>
				!!(
					!getValues('marketplaceSettings.dateLearningSettings.isActive') ||
					(getValues('marketplaceSettings.dateLearningSettings.start') &&
						new Date(value).toLocaleDateString())
				) || ValidationErrorMessages.DATEPICKER_INCORRECT
		})
		register('marketplaceSettings.announcementDescription', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('marketplaceSettings.documentNameAfterLearning', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('marketplaceSettings.employmentDescription', {
			minLength: {
				value: 3,
				message: ValidationErrorMessages.INCORRECT
			},
			pattern: {
				value: getPatterns(PatternsType.TRIM_STRING),
				message: ValidationErrorMessages.INCORRECT
			}
		})
		register('marketplaceSettings.corporateLearningSettings.isActive')
		register('marketplaceSettings.corporateLearningSettings.email', {
			validate: (value) => {
				if (
					!getValues('marketplaceSettings.corporateLearningSettings.phone') &&
					!value
				) {
					return ValidationErrorMessages.CHOOSE_AT_LEAST_ONE
				}
				if (value && !isEmail(value)) {
					return ValidationErrorMessages.INCORRECT
				}
			}
		})
		register('marketplaceSettings.corporateLearningSettings.phone', {
			validate: (value) => {
				if (
					!getValues('marketplaceSettings.corporateLearningSettings.email') &&
					!value
				) {
					return ValidationErrorMessages.CHOOSE_AT_LEAST_ONE
				}
				if (value && value.length !== 16) {
					return ValidationErrorMessages.INCORRECT
				}
			}
		})
		register('certificateSettings.templateInfo.teacherSettings.isActive')
		register('certificateSettings.templateInfo.teacherSettings.name')
		register('certificateSettings.templateInfo.schoolSettings.isActive')
		register('certificateSettings.templateInfo.schoolSettings.schoolName')
		register('certificateSettings.templateInfo.schoolSettings.signerPost')
		register('certificateSettings.templateInfo.schoolSettings.signerName')
	}, [])

	useEffect(() => {
		setValue('name', 'name')
		setValue('description', 'description')
		setValue('coverUrl', 'coverUrl')
		setValue('directionsIdList', [1, 11])
		setValue('certificateSettings.isActive', true)
		setValue('certificateSettings.type', 2)
		setValue('reviewResponsibilityStatus', 1)
		setValue('marketplaceSettings.isActive', true)
		setValue('marketplaceSettings.studyFormatId', 1)
		setValue('marketplaceSettings.announcementDescription', 'test')
		setValue('marketplaceSettings.documentNameAfterLearning', 'result')
		setValue('marketplaceSettings.employmentDescription', 'employment')
		setValue('marketplaceSettings.corporateLearningSettings.isActive', true)
		setValue(
			'marketplaceSettings.corporateLearningSettings.email',
			'beardw@gmail.com'
		)
		setValue('marketplaceSettings.corporateLearningSettings.phone', '')
		setValue('certificateSettings.templateInfo.teacherSettings.isActive', true)
		setValue(
			'certificateSettings.templateInfo.teacherSettings.name',
			'teacherName'
		)
		setValue('certificateSettings.templateInfo.schoolSettings.isActive', true)
		setValue(
			'certificateSettings.templateInfo.schoolSettings.schoolName',
			'schoolName'
		)
		setValue(
			'certificateSettings.templateInfo.schoolSettings.signerPost',
			'signerPost'
		)
		setValue(
			'certificateSettings.templateInfo.schoolSettings.signerName',
			'signerName'
		)
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<MainTabFormState>) => (value: any) =>
			setValue(name, value),
		[]
	)

	useScrollToError(formState)

	const submitHandler = useCallback(
		handleSubmit(async (data) => {
			console.log(data)
			// const response = await updateYourself(await getFormData(data))
			// const { error } = response as unknown as ResponseWithError
			// if (error) {
			// 	pushError(error.data)
			// 	return
			// }
			//
			// setChangeInfoModalIsOpen(true)
		}),
		[handleSubmit]
	)

	return (
		<MainFormTabComponent
			setValue={setValue}
			studyFormOptionsList={studyFormatOptionsList}
			control={control}
			onChange={changeHandler}
			onSubmit={submitHandler}
			getValues={getValues}
			errors={formState.errors}
			tagsList={tagsList}
			watch={watch}
		/>
	)
}

export default MainFormTab
