import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Recaptcha from 'react-recaptcha'


class NextForm extends React.Component{
	constructor(props){
		super(props)
		this.recaptchaLoaded = this.recaptchaLoaded.bind(this)
		this.verifyCallback = this.verifyCallback.bind(this)
	}

	back = event => {
		event.preventDefault()
		this.props.prevStep()
	}
	recaptchaLoaded(){
		console.log('recaptcha loaded')
	}
	verifyCallback(response){
		if(response){
			this.props.setVerify(true)
		}
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
					<Recaptcha
    					sitekey="6Ld9Y9UZAAAAABgqhHKBBVDcHkoMr-x5y2YePl8V"
    					render="explicit"
    					verifyCallback={this.verifyCallback}
    					onloadCallback={this.recaptchaLoaded}
    					theme="dark"
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