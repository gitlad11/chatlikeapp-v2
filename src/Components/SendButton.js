import React from 'react'

function SendButton(props){
	const message = props.message
	const pushMessage = props.pushMessage

	const Submit = () =>{
		//alert(message)
		pushMessage()
	}

	if(!message == 0){
		//console.log(message)
		return(
			<div className="icon send">
                <button type='submit' onClick={Submit} className='send-btn'></button>
            </div>
			)	
	} else {
		return (
			<div className="icon send">
                <button className= 'mic-btn'></button>
           </div>
		)
	}
}
export default SendButton;