import React, { FC } from 'react'

import { Switch } from 'UI'
import { TestTimeLimitProps as TestTimeLimitContainerProps } from 'containers/Courses/Entities/Tests/Tabs/Content/LimitationsForm/TimeLimit'
import TimeLimit from 'UI/TimeLimit'

import cl from '../style.module.scss'

interface TestTimeLimitProps extends TestTimeLimitContainerProps {}

const TestTimeLimit: FC<TestTimeLimitProps> = ({
	errors,
	onChange,
	control,
	watch
}) => (
	<div className={cl.inputContainer}>
		<label>Ограничение по времени</label>
		<Switch
			labelTitle="Ограничить прохождение тестирования по времени"
			control={control}
			name="passingTimeLimit.isActive"
			onChange={onChange('passingTimeLimit.isActive')}
		/>
		<div className={cl.timeLimitContainer}>
			<TimeLimit
				control={control}
				name="passingTimeLimit.timeLimitSeconds"
				watch={watch}
				onChange={onChange('passingTimeLimit.timeLimitSeconds')}
			/>
		</div>
	</div>
)

export default TestTimeLimit
