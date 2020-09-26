import React from 'react'
import Avatar from './Avatar'
import CheckIcon from './Images/icons8-double-24.png'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'
import socket from '../Socket'

function Contact(props){
    const user = props.user
	const friend = props.friend
	const messages = props.messages
    console.log(messages)
	const setContactSelected = props.setContactSelected
	const minimize = (message,length) => {
		return message.length > length ? 
				`${message.substring(0, length)} ...` 
				: message
	}
	const Select = () => {
		setContactSelected(friend)
        if(messages.length !== 0){
            toSeen()
        }
	}

if(messages.length !== 0){
	const lastTime = Math.max(...messages.map((message) => Date.parse(message.date)))
    const lastMessage = messages.find((message) => Date.parse(message.date) === lastTime)

    var toSeen = () =>{
        if(lastMessage.from !== user.number){
        socket.emit("messageSeen", { from : user.number, to : friend.contact.number })
        socket.on('seen', () => {
            socket.emit('getDialogs', { contacts : user.friends })
        })
        }
    }
   
	return (<div className="contact-box" onClick ={Select}>
                        <Avatar contact={friend.contact}/>
                        <div className="right-section">
                            <div className="contact-box-header">
                            	<h3 className="avatar-title">{friend.contact.name}</h3>
                                <h5 style={{color : "darkgrey"}} className="avatar-title">{friend.contact.number}</h5> 
                                <span className="time-mark">{lastMessage.date}</span>
                            </div>
                            <div className="last-msg">
                            	{ lastMessage.seen == true ? (
                                <img src={CheckIcon} alt="check" className="icon-small" />
                            	) : (
                            	<img src={NCheckIcon} alt="check" className="icon-small" />
                            	)}
                                <span className="text">{minimize(lastMessage.msg, 40)}</span>
                            </div>
                        </div>
        		</div>)
		} else {
			return (
					<div className="contact-box" onClick ={Select}>
                        <Avatar contact={friend.contact}/>
                        <div className="right-section">
                            <div className="contact-box-header">
          						<h3 className="avatar-title">{friend.contact.name}</h3>
                                <h5 style={{color : "darkgrey"}}>{friend.contact.number}</h5> 
                            </div>
                        </div>
        			</div>
				)
		}
}
export default Contact 