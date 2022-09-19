import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'

import actions from 'store/actions'
import { AppDispatch, RootState } from 'store'

type A = typeof actions
type B = A[keyof A]

type Selector<C extends B> = (state: A) => C
export const useActions = <D extends B>(selector: Selector<D>) => {
	const dispatch = useDispatch()
	return bindActionCreators(selector(actions), dispatch)
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
