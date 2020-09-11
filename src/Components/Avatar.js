import React from 'react';
import UserAvatar from './Images/icons8-male-user.png'

function Avatar(props){
	const contact = props.contact
	if(!contact.avatar || contact == null){
	return (
		<div className="avatar-component">
            <img src={UserAvatar} className="avatar" alt="friend"/>
        </div>
		)
	} else {
		return (
		<div className="avatar-component">
            <img src={contact.avatar} className="avatar" alt="friend"/>
        </div>
			)
	}
}

export default Avatar;