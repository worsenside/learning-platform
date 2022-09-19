import React, { FC, memo, useCallback, useEffect, useMemo } from 'react'
import { FieldPath, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { DevTool } from '@hookform/devtools'

import { getFullName } from 'helpers'
import AccessFormTabComponent from 'components/Courses/Tabs/Content/AccessForm'
import { ResponseEntityId } from 'types'
import { schoolQuery, userQuery, courseQuery } from 'store/queries'
import { IOption } from 'UI/Select/types'
import { useScrollToError } from 'hooks'

export interface AccessFormState {
	teachersIdList: ResponseEntityId[]
	curatorsIdList: ResponseEntityId[]
}

const AccessFormTab: FC = () => {
	const { courseId }: { courseId?: ResponseEntityId } = useParams()

	const { data: schoolData } = schoolQuery.useGetSchoolQuery()
	const { data: courseData } = courseQuery.useGetCourseQuery(courseId)
	const { data: userData } = userQuery.useGetUsersQuery({
		usersIdList: schoolData?.data.usersIdList
	})

	const { register, control, formState, setValue, handleSubmit } =
		useForm<AccessFormState>({
			defaultValues: {
				curatorsIdList: [],
				teachersIdList: []
			}
		})

	useEffect(() => {
		if (!courseData?.data) {
			return
		}

		const { teachersIdList, curatorsIdList } = courseData.data
		setValue('teachersIdList', teachersIdList)
		setValue('curatorsIdList', curatorsIdList)
	}, [courseData])

	const teachersIdList = useWatch({
		control,
		name: 'teachersIdList',
		defaultValue: []
	})
	const curatorsIdList = useWatch({
		control,
		name: 'curatorsIdList',
		defaultValue: []
	})

	const employersOptionsList: IOption[] = useMemo(() => {
		const school = schoolData?.data

		if (!school?.usersIdList.length) {
			return []
		}

		if (!userData?.data) {
			return []
		}

		return school.usersIdList.map((userId) => ({
			value: userId,
			text: getFullName(userData.data.find((user) => user.id === userId) || {}),
			hidden: [teachersIdList, curatorsIdList].some((idList) =>
				idList.includes(userId)
			)
		}))
	}, [userData, schoolData, teachersIdList, curatorsIdList])

	useEffect(() => {
		register('teachersIdList')
		register('curatorsIdList')
	}, [])

	const changeHandler = useCallback(
		(name: FieldPath<AccessFormState>) => (value: any) => setValue(name, value),
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
		<>
			<AccessFormTabComponent
				onSubmit={submitHandler}
				control={control}
				onChange={changeHandler}
				errors={formState.errors}
				setValue={setValue}
				employersOptionsList={employersOptionsList}
			/>
			<DevTool control={control} />
		</>
	)
}

export default memo(AccessFormTab)
