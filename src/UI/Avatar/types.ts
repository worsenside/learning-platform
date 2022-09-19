export interface IAvatar {
	photoUrl?: string
	firstName?: string
	lastName?: string
}

export interface AvatarProps extends IAvatar {
	styleTypes?: AvatarSizes[]
}

export enum AvatarSizes {
	SMALL = 'Small',
	MEDIUM = 'Medium'
}
