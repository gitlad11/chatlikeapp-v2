import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReCAPTCHA from 'react-google-recaptcha';




class NextForm extends React.Component{
	constructor(props){
		super(props)
		this.verifyCallback = this.verifyCallback.bind(this)
		this.erroredCallback = this.erroredCallback.bind(this)
	}

	back = event => {
		event.preventDefault()
		this.props.prevStep()
	}
	verifyCallback(response){
		if(response){
			this.props.setVerify(true)
		}
	}
	erroredCallback(error){
		console.log(error)
	}

	render(){
		const error = this.props.error
		const message = this.props.message
		return(
			<ThemeProvider>
				<Dialog open
						fullWidth
						maxWidth='sm'>
				<AppBar color='default' position="static">
						<Toolbar>
							<Typography style={{ margin : 'auto' }}
									variant='h4'>Verify</Typography>
						</Toolbar>
				</AppBar>		
				<br/>
				<div style={{margin : 'auto'}}>

					<ReCAPTCHA
						sitekey="6LfSbNUZAAAAAH52ZEnh0II-hryPI9k2NlQrRU8A"
						onChange={this.verifyCallback}
						onErrored={this.erroredCallback}
					/>

  				</div>	
  				<br/>		
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