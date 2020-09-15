import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


class LoginForm extends React.Component{
	next = event => {
		event.preventDefault()
		this.props.nextStep()
	}
	render(){	
		
		const {name, nameChange, number, numberChange} = this.props;
		return (
			<ThemeProvider>
				<Dialog open 
						fullWidth 
						maxWidth='sm'>

						<AppBar color='default' position="static">
							<Toolbar>
								<Typography style={{ margin : 'auto' }}
											variant='h4'>Login</Typography>
							</Toolbar>
						</AppBar>
					<br/>	
					<TextField  
								placeholder="User name"
								label="User name"
								margin="normal"

								onChange={nameChange}
								value={name}/>
					<br />
					<TextField 
								placeholder="Phone number"
								label= "Phone number"
								margin="normal"

								onChange={numberChange}
								value={number}/>
					<br/>			
					<Button variant="contained"
							color="primary"
							onClick={this.next}>Next</Button>
					<br/>				
					<Typography variant='h6' 
								style={{ margin: 'auto' }}>don't have account yet?</Typography>

					<Link style={{ textDecoration : 'none', margin : "auto"}}
						  to='/registration'>
					<Button variant="outlined" 
							color="primary"
							style={{ width : "200px" }}>Registration</Button>
							</Link>
					<br/>						
				</Dialog>
			</ThemeProvider>
			)
	}
}
export default LoginForm;