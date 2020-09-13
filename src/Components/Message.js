import React from 'react'
import CheckIcon from './Images/icons8-checkmark-24.png'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'
import { Twemoji } from "react-emoji-render"


function Message(props){
	const message = props.message

	return (
		  <div className={`message ${message.isMainUser ? 'sent': 'received'}`}>
                        <Twemoji text={message.msg}/>
                    <div className="metadata">
                        <span className="date">{message.date.toLocaleString()}</span>
                        { message.isMainUser && message.seen == true ? (
                            <img src={CheckIcon} className='icon-small'/>
                            ) : (
                            <img src={NCheckIcon} className='icon-small'/>
                            )}
                    </div>
           </div>
		)
}
export default Message