import React from 'react';
import UserAvatar from './Images/icons8-male-user.png'
import Avatar from './Avatar'
function MainHeader(props){
	const contact = props.contactSelected
	const darktheme = props.darktheme
	const setDarkTheme = props.setDarkTheme

	const onDark = () => {
		if(darktheme){
			setDarkTheme(false)
		} else {
			setDarkTheme(true)
		} 
	}
	return (
		<header>
            <div className="avatar-component">
                <Avatar contact={contact} />
                <h3 className="avatar-title">{contact.name}</h3>
            </div>
            <button onClick={onDark} className='theme-btn'></button>
        </header>
		)
}
export default MainHeader