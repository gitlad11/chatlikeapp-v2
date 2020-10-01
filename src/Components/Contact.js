import React from 'react'
import Avatar from './Avatar'
import CheckIcon from './Images/icons8-double-24.png'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'
import socket from '../Socket'

function Contact(props){
    const user = props.user
	const friend = props.friend
	const messages = props.messages
    //console.log(messages)
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
        }
    }
   
	return (<div className="contact-box" onClick ={Select}>
                        <Avatar contact={friend.contact}/>
                        <div className="right-section">
                            <div className="contact-box-header">
                                { friend.contact.name.length > 0 ? (

                                    <h3 className="avatar-title">{friend.contact.name}</h3>
                                    ) : ( <h3 className="avatar-title">{friend.contact.number}</h3> )
                                }                          	
                                <span className="time-mark">{lastMessage.date}</span>
                            </div>
                            <div className="last-msg">
                            	{ lastMessage.seen == true ? (
                                <img src={CheckIcon} alt="check" className="icon-small" />
                            	) : (
                            	<img src={NCheckIcon} alt="check" className="icon-small" />
                            	)}
                                <span className={lastMessage.from !== user.number ? "text" : "text dark"}>{minimize(lastMessage.msg, 40)}</span>
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