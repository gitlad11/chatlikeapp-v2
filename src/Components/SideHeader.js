import React from 'react'
import UserAvatar from './Images/icons8-male-user.png'

function SideHeader(props){
	const user = props.user
	if(!user.avatar || user.avatar == null){
	return (
		<header>
            <div className="avatar-component">
             	<img src={UserAvatar} className="avatar" alt="User"/>
            </div>
        </header>
		)
	} else {
		return (
		<header>
            <div className="avatar-component">
             	<img src={user.avatar} className="avatar" alt="User"/>
            </div>
        </header>
			)
	}	
}
export default SideHeader