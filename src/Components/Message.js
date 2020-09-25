import React from 'react'
import CheckIcon from './Images/icons8-checkmark-24.png'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'
import { Twemoji } from "react-emoji-render"


function Message(props){
	const message = props.message
    const isMainUser = props.mainUser.number
	return (
		  <div className={`message ${message.from === isMainUser ? 'sent': 'received'}`}>
                        <Twemoji text={message.msg}/>
                    <div className="metadata">
                        <span className="date">{message.date.toLocaleString()}</span>
                        { message.from === isMainUser ? (
                            <img src={ message.seen == true ? CheckIcon : NCheckIcon} className='icon-small'/>
                            ) : (<img className='icon-small'/>)}
                    </div>
           </div>
		)
}
export default Message