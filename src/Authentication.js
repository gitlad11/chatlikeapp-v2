import React, { useEffect } from 'react'
import Axios from 'axios'

const Authentication = async () =>{
	var token = localStorage.getItem("auth-token")
	if(token == null){
		localStorage.setItem("auth-token", "")
		token = ""
	}
	const User = await Axios.post('http://localhost:3004/authenticate',
		null,{
			headers : { "x-auth-token" : token }
		}
	)
	return User
}
Authentication()


