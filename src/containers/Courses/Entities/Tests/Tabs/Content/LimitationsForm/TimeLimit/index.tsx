import React, { FC } from 'react'

import TaskTimeLimitComponent from 'components/Courses/Entities/Tests/Tabs/Content/LimitationsForm/TimeLimit'
import { LimitationsFormTabProps } from 'components/Courses/Entities/Tests/Tabs/Content/LimitationsForm'

export interface TestTimeLimitProps
	extends Omit<LimitationsFormTabProps, 'onSubmit'> {}
const TaskTimeLimit: FC<TestTimeLimitProps> = ({
	errors,
	onChange,
	watch,
	control
}) => (
	<TaskTimeLimitComponent
		errors={errors}
		watch={watch}
		control={control}
		onChange={onChange}
	/>
)

export default TaskTimeLimit
