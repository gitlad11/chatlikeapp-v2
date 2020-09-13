import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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

						<AppBar position="static">
							<Toolbar>
								<Typography variant='h4'>Login</Typography>
								<Button color="inherit">Registration</Button>
							</Toolbar>
						</AppBar>

					<TextField  placeholder="User name"
								label="User name"
								margin="normal"

								onChange={nameChange}
								value={name}/>
					<br />
					<TextField  placeholder="Phone number"
								label= "Phone number"
								margin="normal"

								onChange={numberChange}
								value={number}/>
					<Button variant="contained"
							color="primary"
							onClick={this.next}>Next</Button>			
				</Dialog>
			</ThemeProvider>
			)
	}
}
export default LoginForm;