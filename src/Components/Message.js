import React from 'react'
import CheckIcon from './Images/icons8-checkmark.svg'
import NCheckIcon from './Images/icons8-checkmarkblue.svg'

function Message(props){
	const message = props.message

	return (
		  <div className={`message ${message.isMainUser ? 'sent': 'received'}`}>
                        {message.msg}
                    <div className="metadata">
                        <span className="date">{message.date.toLocaleString()}</span>
                        { message.isMainUser && <img src={CheckIcon} className='icon-small'/>}
                    </div>
           </div>
		)
}
export default Message