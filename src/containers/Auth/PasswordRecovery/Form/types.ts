export enum PasswordRecoverySteps {
	START_STEP = 0,
	REPEAT_PASSWORD_RECOVERY_CODE_STEP,
	FINISH_STEP
}

export interface PasswordRecoveryFormBaseProps {
	onChangePasswordRecoveryStep: (step: PasswordRecoverySteps) => void
}
