import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


class NextForm extends React.Component{

	back = event => {
		event.preventDefault()
		this.props.prevStep()
	}

	render(){
		const error = this.props.error
		const message = this.props.message
		return(
			<ThemeProvider>
				<Dialog open
						fullWidth
						maxWidth='sm'>

					<Button color="primary"
							variant="contained"
							onClick = {this.props.submit}>I am not robot</Button>
	
					<Button color="secondary"
							variant="contained"
							onClick={this.back}>I am robot</Button>

				<Snackbar open={error}
							  autoHideDuration={6000}>
							  <MuiAlert elevation={6}
							  			variant="filled" 
							  			severity="error">
                              	{message}
        					  </MuiAlert>
				</Snackbar>
				</Dialog>
			</ThemeProvider>
			)
	}
}
export default NextForm;