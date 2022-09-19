import React, { FC } from 'react'

import { Link } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import AuthorizationForm from 'containers/Auth/Authorization/Form/index.container'

import cl from './style.module.scss'

const AuthorizationPage: FC = () => (
	<div className={cl.auth}>
		<div className={cl.body}>
			<h1>Авторизация</h1>
			<AuthorizationForm />
		</div>
		<div className={cl.footer}>
			<div>
				<span>Еще не зарегистрированы?</span>
				<Link styleTypes={[LinkStyles.PRIMARY]} href="/registration">
					Создайте аккаунт
				</Link>
			</div>
			<p>© 2021 Учебная платформа. Все права защищены</p>
		</div>
	</div>
)

export default AuthorizationPage
