import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NextForm extends React.Component{

	back = event => {
		event.preventDefault()
		this.props.prevStep()
	}
	render(){

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

				</Dialog>
			</ThemeProvider>
			)
	}
}
export default NextForm;