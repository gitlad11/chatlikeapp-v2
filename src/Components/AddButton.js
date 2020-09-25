import React from 'react'
import Button from '@material-ui/core/Button';


function AddButton(props){
	const have = props.have
	const addFriend = props.addFriend
	const added = props.added
	if(added.success == false){
	return (
			<Button onClick={addFriend}
                	variant="contained"
                	style={{ width : "60px" }} 
					color="primary">Add</Button>)
	} else { 
		return (
			<Button onClick={addFriend}
                	variant="outlined" 
					color="primary">{added.message}</Button>
			)
	 }
}


export default AddButton;
