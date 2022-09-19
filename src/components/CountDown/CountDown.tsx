import React, { FC, useEffect, useState } from 'react'

import cl from './style.module.scss'

interface CountDownProps {
	resetTimer: boolean
	setResetTimer: (_: boolean) => void
	minutes: number
	seconds: number
	timerIsOver: boolean
	setTimerIsOver: (_: boolean) => void
}

const CountDown: FC<CountDownProps> = ({
	resetTimer,
	setResetTimer,
	minutes,
	seconds,
	timerIsOver,
	setTimerIsOver
}) => {
	const [[m, s], setTime] = useState([minutes, seconds])

	const tick = () => {
		if (timerIsOver) {
			return
		}
		if (m === 0 && s === 0) {
			setTimerIsOver(true)
		} else if (s === 0) {
			setTime([m - 1, 59])
		} else {
			setTime([m, s - 1])
		}
	}

	const reset = () => {
		setTime([minutes, seconds])
		setTimerIsOver(false)
		setResetTimer(false)
	}
	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000)
		return () => clearInterval(timerId)
	})
	useEffect(() => {
		if (resetTimer) {
			reset()
		}
	}, [resetTimer])
	return (
		<div className={cl.countDown}>{`${m.toString().padStart(2, '0')}:${s
			.toString()
			.padStart(2, '0')}`}</div>
	)
}

export default CountDown
