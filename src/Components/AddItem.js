import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';

import AddButton from './AddButton'
import axios from 'axios'

function AddItem(props){
	const user = props.user
	const contact = props.contact
	const [ added, setAdded ] = useState({ success : false , message : ''})
	const addFriend = () =>{
		const result = axios.put('/add', { from : user , to : contact })
		.then((result) => setAdded({ success : result.data.success , message : result.data.message }))
		window.location.reload()
	}
	return (
		<div style={{ justifyContent : "space-between" }} className='contact-box'>
				<Avatar style={{ fontSize: '60px',width: '60px',height: '60px',}} src={contact.avatar}/>
				<div style={{ "margin" : "auto", display : "flex", flexDirection : "column" }}>
					{ contact.name.length > 0 ? (
						<h3 className='avatar-title'>{contact.name}</h3>
						) : (
							<h3 className='avatar-title'>{contact.number}</h3>
						)}
				</div>
					<AddButton  added={added}
								contact={contact}
								addFriend={addFriend}/> 
				</div>
		)
}

export default AddItem

