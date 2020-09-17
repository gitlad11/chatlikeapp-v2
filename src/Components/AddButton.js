import React from 'react'
import Button from '@material-ui/core/Button';


function AddButton(props){
	const have = props.have
	const addFriend = props.addFriend

	if(have == true){
		return ( 
			<Button  variant="outlined"
								color="primary"
								style={{ width : "60px" }}
								>Added</Button>) 
		} else { return (
				<Button onClick={addFriend}
                		style= {{ width : "60px" }}
                		variant="contained" 
						color="primary">Add</Button>)
	}
}

export default AddButton;
