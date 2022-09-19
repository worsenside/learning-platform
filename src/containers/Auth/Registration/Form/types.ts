export enum RegistrationSteps {
	CHOOSE_SCHOOL_ROLE_STEP = 0,
	START_REGISTRATION_STEP,
	REPEAT_REGISTRATION_CODE_STEP,
	FINISH_REGISTRATION_STEP
}

export interface RegistrationFormBaseProps {
	onChangeRegistrationStep: (step: RegistrationSteps) => void
}
