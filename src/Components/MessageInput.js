import React, {useState, useEffect} from 'react'

import SendButton from './SendButton'
import { Twemoji } from "react-emoji-render"
import Emojis from './Emojis'
import './Loading.css'

function MessageInput(props){

	const message = props.message
  const setMessage = props.setMessage
  const pushMessage = props.pushMessage
  const sending = props.sending

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
  const onEmoji = async (event) => {

    if (event.target.alt !== undefined){
      setMessage(message + event.target.alt)
    } 
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
                        { sending ? (
                             <div id="floatingBarsG">
                          <div class="blockG" id="rotateG_01"></div>
                          <div class="blockG" id="rotateG_02"></div>
                          <div class="blockG" id="rotateG_03"></div>
                          <div class="blockG" id="rotateG_04"></div>
                          <div class="blockG" id="rotateG_05"></div>
                          <div class="blockG" id="rotateG_06"></div>
                          <div class="blockG" id="rotateG_07"></div>
                          <div class="blockG" id="rotateG_08"></div>
                        </div>
                          ) : (<div></div>)}

          </div>
		)
}
export default MessageInput;