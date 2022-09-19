import { FieldError, FormState } from 'react-hook-form'
import { useEffect } from 'react'

type UseScrollToError = <T>(formState: FormState<T>) => void

const useScrollToError: UseScrollToError = (formState) => {
	// useEffect(() => {
	// const { errors } = formState
	// if (!errors) {
	// return
	// }
	// const errorsValues = Object.values(errors)
	// if (!errorsValues.length || !errorsValues) {
	// return
	// }
	// const firstErrorValue = [...errorsValues].shift()
	// const error = Object.values(firstErrorValue).shift() as FieldError
	// const firstErrorElement = document.querySelector(
	// 	`[name^="${error.ref?.name}"]`
	// )
	// if (!firstErrorElement) {
	// }
	// TODO бэклог сделать
	// firstErrorElement.scrollIntoView({ behavior: `smooth`, block: 'center' })
	// }, [formState])
}

export default useScrollToError
