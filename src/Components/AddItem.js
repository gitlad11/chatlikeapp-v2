import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import AddButton from './AddButton'
import axios from 'axios'

function AddItem(props){
	const user = props.user
	const contact = props.contact
	const addFriend = () =>{
		const result = axios.put('http://localhost:3004/add/', { from : user._id , to : contact._id })
		.then((result) => alert(result.data.message))
		.catch((error) => console.log(error))
	}

	return (
		<div style={{ justifyContent : "space-between" }} className='contact-box'>
				<Avatar style={{ height : "40px", width : "40px" }} src ={contact.avatar}/>
				<div style={{ "margin" : "auto", display : "flex", flexDirection : "column" }}>
					<h3 className='avatar-title'>{contact.name}</h3>
					<p style= {{ marginTop: "15%", color : "darkgrey" }}>{contact.number}</p>
				</div>
				{ user.friends.map((friend) => (
					 friend == contact ? (
					<AddButton addFriend={addFriend}
							   have={true}/>
							   ) : (<AddButton addFriend={addFriend}
							   					have={false}/>)
                			
                		))
					}
    	
				}
				</div>
		)
}

export default AddItem

