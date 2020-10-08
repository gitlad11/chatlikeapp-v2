import React, { useState } from 'react'
import LoginForm from './Components/LoginForm'
import NextForm from './Components/NextForm'
import axios from 'axios'
import history from './history'

function Login(){
	const [step, setStep] = useState(1)
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')
	const [error , setError] = useState(false)
	const [message, setMessage] = useState('')

	const nextStep = () =>{
		setStep(step + 1)
	}
	const prevStep = () =>{
		setStep(step - 1)
	}
	const submit = (event) =>{
		event.preventDefault()
		const data = { 'name' : name, 'number' : number }
		const res = axios.post('http://localhost:3004/login', 
			data, { headers : {"Content-Type" : "application/json"}
		}).then((response) => { 
			setError(response.data.error)
			setMessage(response.data.message)
			if(response.data.success && response.data.token){
				localStorage.setItem("auth-token", response.data.token)
				setTimeout(1)
				history.push('/')
				window.location.reload()
			} 
		})
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
						error={error}
						message={message}
						submit={submit}/>

		)
	default:
		(console.log('This form created with material-ui'))
}
}
export default Login;