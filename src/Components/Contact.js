import React from 'react'
import Avatar from './Avatar'
import CheckIcon from './Images/icons8-checkmark.svg'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'

function Contact(props){
	const contact = props.contact
	const messages = props.messages
	const setContactSelected = props.setContactSelected
	const lastTime = Math.max(...messages.map((message) => message.date.getTime()))
	const lastMessage = messages.find((message) => message.date.getTime() === lastTime)

	const toMax = (message,length) => {
		return message.length > length ? 
				`${message.substring(0, length)} ...` 
				: message
	}
	const Select = () => {
		setContactSelected(contact)
	}
	return (
		<div className="contact-box" onClick ={Select}>
                        <Avatar contact={contact}/>

                        <div className="right-section">
                            <div className="contact-box-header">
                                <h3 className="avatar-title">{contact.name}</h3>
                                <span className="time-mark">{lastMessage.date.toLocaleDateString()}</span>
                            </div>
                            <div className="last-msg">
                                <img src={CheckIcon} alt="check" className="icon-small" />
                                <span className="text">{toMax(lastMessage.msg, 45)}</span>
                            </div>
                        </div>
                    </div>
		)
}
export default Contact 