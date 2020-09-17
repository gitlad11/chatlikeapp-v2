import React, { useState, useEffect } from 'react'
import MainBg from './Images/Main.jpg'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddItem from './AddItem'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Main(props){
	const user = props.user
	const [ query, setQuery ] = useState('')
	const [searchR , setSearchR] = useState([])

	const addChange = (event) => {
		setQuery(event.target.value)
		const data = { query : query }
		const result = axios.post('http://localhost:3004/contacts/', data)
			.then((result) => setSearchR(result.data))
			.catch((error) => console.log(error))
		console.log(searchR)
	}

	return (
		<div className='Main'>
			<img src={MainBg} alt='Welcome'/>
			<div className='add-contact'>
				<div className='search'>
				<input  placeholder='Search contact'
					value={query}
					onChange={addChange}></input>
				</div>

				<div className='contact-boxes'>
				{searchR.map((contact) => (

					<AddItem user={user}	
							 key={contact._id} 
							 user={user} 
							 contact={contact}/>
 
				))
				}	
				</div>
			</div>			
			<h2>Stay connected!</h2>
		</div>
		)
}
export default Main