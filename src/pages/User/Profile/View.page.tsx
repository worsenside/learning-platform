import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Link, Loader, Avatar } from 'UI'
import { LinkStyles } from 'UI/Link/types'
import { AvatarSizes } from 'UI/Avatar/types'
import { LoaderStyles } from 'UI/Loader/types'
import { UsersViewForm } from 'containers/Users'
import { userQuery } from 'store/queries'
import { IUser } from 'types/models/user.model'

import cl from './style.module.scss'

const UserProfileViewPage = () => {
	const [user, setUser] = useState<IUser>()
	const { userId } = useParams()

	const { data: userData, isLoading } = userQuery.useGetUserByIdQuery(+userId!)

	useEffect(() => {
		if (isLoading || !userData) {
			return
		}

		setUser(userData.data)
	}, [userData, isLoading])

	if (isLoading) {
		return <Loader styleTypes={[LoaderStyles.BIG]} />
	}

	return (
		<div className={cl.container}>
			<div className={cl.back}>
				<Link styleTypes={[LinkStyles.GO_BACK]} href="/user/list">
					Вернуться назад
				</Link>
			</div>
			{!user ? (
				<div>Пользователь с таким ID не найден</div>
			) : (
				<>
					<div className={cl.header}>
						<Avatar
							photoUrl={user.avatarUrl}
							firstName={user.firstName}
							lastName={user.lastName}
							styleTypes={[AvatarSizes.MEDIUM]}
						/>
						<div className={cl.name}>
							<h2>
								{user.firstName} {user.lastName}
							</h2>
						</div>
					</div>
					<div className={cl.content}>
						<p className={cl.caption}>Общая информация о пользователе</p>
						<div className={cl.splitLine} />
						<UsersViewForm {...user} />
					</div>
				</>
			)}
		</div>
	)
}

export default UserProfileViewPage
