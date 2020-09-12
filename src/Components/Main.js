import React from 'react'
import MainBg from './Images/Main.jpg'
function Main(){
	return (
		<div className='Main'>
			<img src={MainBg} alt='Welcome'/>
			<h2>Stay connected!</h2>
		</div>
		)
}
export default Main