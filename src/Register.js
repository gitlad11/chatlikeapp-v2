import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserAvatar from './Components/Images/icons8-male-user.png';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import './Components/Loading.css'

function Alert(props) {
  return <MuiAlert elevation={6} 
  				   variant="filled" 
  				   severity="success" 
  				   {...props} />;
}

function Register(){
	const [preview, setPreview ] = useState('')
	const [file, setFile] = useState('')
	const [name , setName] = useState('')
	const [number, setNumber] = useState('')
	const [snackbar , setSnackbar] = useState(false)
	const [success , setSuccess] = useState(false)
	const [message , setMessage ] = useState('')
	const [loading , setLoading ] = useState(false)

	const imageChange = (event) =>{
		const reader = new FileReader();
		reader.onload = () => {
			if(reader.readyState === 2){
				setPreview(reader.result)
			}
		}
		if(!event.target.files[0] == 0){
			reader.readAsDataURL(event.target.files[0])
			setFile(event.target.files[0])
		} else {
			console.log('no image')
		}
	}
	const imageRemove = (event) =>{
		setPreview()
		setFile()
	}
	const nameChange = (event) =>{
		setName(event.target.value)
	}
	const numberChange = (event) =>{
		setNumber(event.target.value)
	}
	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return setSnackbar(false);;
    }
  };

	const Submit = async (event) => {
		setLoading(true)
		event.preventDefault();
		const data = new FormData()
		data.append('name', name)
		data.append('number', number)
		data.append('file', file)
		try {
			const res = await axios.post('http://localhost:3004/registration',
										 data, { headers:{
										 	'Content-Type' : 'multipart/form-data' }
					}).then((response) => {
						setLoading(false) 
						setSnackbar(true)
						setSuccess(response.data.success)
						setMessage(response.data.message)
					})
		} catch (error) {if(error.response.status === 500){
			setLoading(false)
			console.log('errors on server side')	
		} else {
			setLoading(false)
			console.log(error.response.data)
		}
	}}
	return (
		<ThemeProvider>
		{loading ? (
				<div id="fountainG">
				<div id="fountainG_1" class="fountainG"></div>
				<div id="fountainG_2" class="fountainG"></div>
				<div id="fountainG_3" class="fountainG"></div>
				<div id="fountainG_4" class="fountainG"></div>
				<div id="fountainG_5" class="fountainG"></div>
				<div id="fountainG_6" class="fountainG"></div>
				<div id="fountainG_7" class="fountainG"></div>
				<div id="fountainG_8" class="fountainG"></div>
				</div>
			) : (
			<Dialog open 
					fullWidth 
					maxWidth='sm'>
			<AppBar color='default' position="static">
				<Toolbar>	
					<Typography style={{ margin : 'auto' }}
								variant='h4'>Registration</Typography>
					</Toolbar>
			</AppBar>
			{ success == true ? (
				<Snackbar open={snackbar}
							onClose={handleClose} 
							  autoHideDuration={6000}>
							  <Alert severity="success">
                              	{message}
        					  </Alert>
				</Snackbar>)
			  : (
			  	<Snackbar open={snackbar} 
							  autoHideDuration={6000}>
							  <Alert severity="error">
                              	{message}
        					  </Alert>
				</Snackbar>)
			  	}
			<br/>
				<form encType="multipart/form-data"
					  style={{ margin : 'auto' }}>
					<Avatar style={{ margin : 'auto',
									height : '100px', width : '100px'}} 
							src = {preview}/>
					<input 
					onChange={imageChange}
					style = {{ display : 'none' }}
        			accept="image/*"
        			id="contained-button-file"
        			multiple
        			type="file"/>
        			<br/>
        		<label htmlFor="contained-button-file">
        			<Button variant="contained" 
        					color="primary" 
        					component="span">
         			 Upload
        			</Button>
        			<Button style={{ marginLeft: '4px' }} 
        					onClick={imageRemove}
        					variant='outlined'
        					color= "secondary"
        					component="span">Remove</Button>
      			</label>
      			<br/>
      			<TextField style= {{ width : '100%'}}
						   placeholder="User name"
							label="User name"
							value={name}
							onChange={nameChange}
							margin="normal"></TextField>
      			<br/>
      			<TextField style = {{ width : '100%'}}
							placeholder="Phone number"
							label= "Phone number"
							value={number}
							onChange={numberChange}
							margin="normal"></TextField>
				<br/>
				<Button style = {{ width : '120px', margin : '3px'}}
						variant="contained"
							color="primary"
							onClick={Submit}>Submit</Button>
				<Link style={{ textDecoration : 'none', margin : "auto"}}
						  to='/login'>
				<Button variant="outlined" 
							color="primary"
							style={{ width : "120px", margin: '3px'}}>Login</Button>
				</Link>			
				</form>
			<br/>
			</Dialog>
			)}
			
		</ThemeProvider>
	)
}
export default Register

///https://icons8.com/cssload