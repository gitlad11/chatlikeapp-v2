import React from 'react';
import UserAvatar from './Images/icons8-male-user.png'
import Avatar from './Avatar'
function MainHeader(props){
	const contact = props.contactSelected
	return (
		<header>
            <div className="avatar-component">
                <Avatar contact={contact} />
                <h3 className="avatar-title">{contact.name}</h3>
            </div>
        </header>
		)
}
export default MainHeader