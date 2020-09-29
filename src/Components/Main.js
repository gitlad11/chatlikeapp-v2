import React, { useState, useEffect } from 'react'
import MainBg from './Images/Main.jpg'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import AddItem from './AddItem'
import history from '../history'


function Main(props){
	const user = props.user
	const [ query, setQuery ] = useState('')
	const [searchR , setSearchR] = useState([])

	const addChange = (event) => {
		setQuery(event.target.value)
		const data = { query : query }
		const result = axios.post('http://localhost:3004/contacts', data)
			.then((result) => setSearchR(result.data))
			.catch((error) => console.log(error))
		console.log(searchR)
	}
	const Logout = () => {
		localStorage.removeItem("auth-token")
		window.location.reload()
	}
	return (
		<div className='Main'>
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
			<img src={MainBg} alt='Welcome'/>			
			<h2>Stay connected!</h2>
			<Button style={{ 'position' : 'static' }}
					onClick={Logout}
					color="secondary"
					variant="outlined">Logout</Button>
		</div>
		)
}
export default Main