export interface IOption {
	value: string | number
	text: string
	hidden?: boolean
}
export enum SelectBorderStyles {
	ROUND = 'Round',
	SUCCESS = 'Success',
	DANGER = 'Danger'
}
export enum SelectSizeStyles {
	DEFAULT = 'Default',
	SMALL = 'Small'
}
