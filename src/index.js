import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
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

ReactDOM.render(
  <BrowserRouter>
    <App mainUser={Authentication()}/>
   </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
