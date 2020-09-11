import React ,  {useEffect, useRef} from 'react'
import UserContext from '../UserContext'
import {useContext} from 'react'
import Message from './Message'

function Dialog(props){
	
	//const messages = useContext(UserContext)
	const messages = props.messages
	
	//creating ref - reference for scroll
	const scrollEnd = useRef(null)

	//while messages is loading , will scroll down to div.ref
	useEffect(() => {
		scrollEnd.current.scrollIntoView()
	}, [messages])
	return (
			<div className="chats">
			{ messages.sort((fir, sec) => fir.date.getTime() - sec.date.getTime())
				.map((message) => (
                <Message message={message} 
                		 key={message.id}/>
			))
			}
				<div style={{ float: 'right', clear : 'both'}}
					ref={scrollEnd}>
				</div>
            </div>
		)
}
export default Dialog 
