import React from 'react'
import CheckIcon from './Images/icons8-checkmark.svg'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'
import { Twemoji } from "react-emoji-render"


function Message(props){
	const message = props.message

	return (
		  <div className={`message ${message.isMainUser ? 'sent': 'received'}`}>
                        { message.msg.includes(':+1:') ? (    
                        <Twemoji text=':+1:'/>) : (message.msg)}
                    <div className="metadata">
                        <span className="date">{message.date.toLocaleString()}</span>
                        { message.isMainUser && <img src={CheckIcon} className='icon-small'/>}
                    </div>
           </div>
		)
}
export default Message