import React, {useState} from 'react'
import EmojiIcon from './Images/icons8-emoji-48.png'
import SendButton from './SendButton'

function MessageInput(props){
	const message = props.message
  const setMessage = props.setMessage
  const pushMessage = props.pushMessage
  //each time input has changed, setMessage
	const Change = (event) =>{
		setMessage(event.target.value)
	}
  //set key enter event on input
  const onEnter = (event) =>{
    if(event.key === 'Enter' && message){
      pushMessage()
    }
  }

	return (
		  <div className="chat-input-box">
                <div className="icon emoji-selector">
                    	<button className='emoji-btn'></button>
                    </div>

                    <div className="chat-input">
                        <input value={message}  
                              onChange ={Change}
                              onKeyDown={onEnter}
                              type="text" 
                              placeholder="Type a message" />
                    </div>
       			<SendButton pushMessage={pushMessage}
                         message={message} />
          </div>
		)
}
export default MessageInput;