import React, {useState} from 'react'
import EmojiIcon from './Images/icons8-emoji-48.png'
import SendButton from './SendButton'
import { Twemoji } from "react-emoji-render"
import Emojis from './Emojis'
function MessageInput(props){
	const message = props.message
  const setMessage = props.setMessage
  const pushMessage = props.pushMessage
  const [openEmoji, setOpenEmoji] = useState(false)
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
 //toggler for show emoji box if openEmoji == true
  const showEmoji = () =>{
    if(openEmoji){
      setOpenEmoji(false)
    } else setOpenEmoji(true)
  }
  const onEmoji = (event) => {
    setMessage(message + event.target.alt)
  }
	return (
		  <div className="chat-input-box">
                <div className={`emoji-box ${openEmoji ? 'active' : ''} `}>
                  {Emojis.map((emoji) => (
                    <button value={emoji} key={emoji} onClick={onEmoji}>
                      <Twemoji className='Twemoji' text={emoji} />
                    </button>
                    ))}
                </div>
                <div className="icon emoji-selector">
                    	<button onClick={showEmoji}
                               className='emoji-btn'></button>
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