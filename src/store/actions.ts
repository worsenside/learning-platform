import {
	systemSlice,
	passwordRecoverySlice,
	registrationSlice,
	schoolSlice,
	userSlice,
	authorizationSlice,
	lessonSlice,
	taskSlice
} from './slices'
import {
	startRegistration,
	breakRegistration,
	repeatRegistrationCode,
	checkRegistrationCode,
	finishRegistration
} from './slices/registration/extraReducers'
import {
	startPasswordRecovery,
	checkPasswordRecoveryCode,
	finishPasswordRecovery
} from './slices/passwordRecovery/extraReducers'
import { inviteUser } from './slices/school/extraReducers'
import { authorize, refreshToken } from './slices/authorization/extraReducers'
import { changePassword } from './slices/user/extraReducers'

const systemActions = {
	common: systemSlice.actions
}
const lessonActions = {
	common: lessonSlice.actions
}
const taskActions = {
	common: taskSlice.actions
}
const registrationActions = {
	common: registrationSlice.actions,
	extra: {
		startRegistration,
		breakRegistration,
		repeatRegistrationCode,
		checkRegistrationCode,
		finishRegistration
	}
}
const passwordRecoveryActions = {
	common: passwordRecoverySlice.actions,
	extra: {
		checkPasswordRecoveryCode,
		finishPasswordRecovery,
		startPasswordRecovery
	}
}
const schoolActions = {
	common: schoolSlice.actions,
	extra: {
		inviteUser
	}
}
const authorizationActions = {
	common: authorizationSlice.actions,
	extra: {
		authorize,
		refreshToken
	}
}
const userActions = {
	common: userSlice.actions,
	extra: { changePassword }
}
const actions = {
	system: { ...systemActions.common },
	registration: {
		...registrationActions.common,
		...registrationActions.extra
	},
	passwordRecovery: {
		...passwordRecoveryActions.common,
		...passwordRecoveryActions.extra
	},
	school: {
		...schoolActions.common,
		...schoolActions.extra
	},
	authorization: {
		...authorizationActions.common,
		...authorizationActions.extra
	},
	user: {
		...userActions.common,
		...userActions.extra
	},
	lesson: {
		...lessonActions.common
	},
	task: {
		...taskActions.common
	}
}

export default actions
