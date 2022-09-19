import React, { FC } from 'react'
import { SchoolRoles } from 'types/models/school.model'

import { Button } from 'UI'
import { ButtonStyles } from 'UI/Button/types'

import cl from 'components/Auth/style.module.scss'

interface RegistrationFormSchoolRoleProps {
	onChange: (schoolRole: SchoolRoles) => void
}

const RegistrationFormSchoolRole: FC<RegistrationFormSchoolRoleProps> = ({
	onChange
}) => (
	<form className={cl.cardsForm} noValidate>
		<div className={cl.card}>
			<div className={cl.cardPhoto} />
			<h2>Репетитор, эксперт</h2>
			<p>Я планирую самостоятельно и единолично обучать людей.</p>
			<Button
				styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				onClick={() => onChange(SchoolRoles.SCHOOL_ADMIN)}
			>
				Выбрать
			</Button>
		</div>
		<div className={cl.card}>
			<div className={cl.cardPhoto} />
			<h2>Школа</h2>
			<p>У меня есть команда для обучения людей</p>
			<Button
				styleTypes={[ButtonStyles.PRIMARY, ButtonStyles.ROUND]}
				onClick={() => onChange(SchoolRoles.TUTOR)}
			>
				Выбрать
			</Button>
		</div>
	</form>
)

export default RegistrationFormSchoolRole
