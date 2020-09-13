import React, { useState } from 'react'
import LoginForm from './Components/LoginForm'
import NextForm from './Components/NextForm'

function Login(){
	const [step, setStep] = useState(1)
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')

	const nextStep = () => {
		setStep(step + 1)
	}
	const prevStep = () => {
		setStep(step - 1)
	}
	const submit = () => {
		console.log('you are in!')
	}
	const nameChange = (event) =>{
		setName(event.target.value)
	}
	const numberChange = (event) =>{
		setNumber(event.target.value)
	}
	switch (step){
	case 1:
	return (

			<LoginForm nextStep={nextStep}
						name={name}
						nameChange={nameChange}
						number={number}
						numberChange={numberChange}/>

	)
	case 2:
	return (

			<NextForm prevStep={prevStep}
						submit={submit}/>

		)
	default:
		(console.log('This form created with material-ui'))
}
}
export default Login;