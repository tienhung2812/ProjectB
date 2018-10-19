import React, { Component } from "react";
import { browserHistory } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import passwordHash from 'password-hash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EmailForm from './EmailForm';
import UserForm from './UserForm';
import MoreForm from './MoreForm';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from '@material-ui/icons/Error';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },

  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const steps = ['', '', ''];

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password){
  var re = /^\S(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return re.test(password);
}


function validateUserName(username){
  var re = /^[A-Za-z0-9_]{6,20}$/;
  return re.test(username);
}

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={activeStep:0,email:null,username:null,password:null,confirmpassword:null,validatePw:false,useralready:false,successful:false}
    this.signUp = this.signUp.bind(this);
    this.checkExistEmail = this.checkExistEmail.bind(this)
  }
  componentDidMount() {
    browserHistory.push('/signup');
  }
  
  signUp(){
    fetch('https://ride-hub.herokuapp.com/api/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email:this.state.email
      })
    }).then(response =>{
      let a =response.ok
      console.log(a)
      if(!a){
        if(response.status==401){
          //User already
          this.setState({useralready:true,successful:false})
          this.setState({ open: true, message: "Username already taken" });
          this.setState(state => ({
            activeStep: state.activeStep - 1,
          }))
        }else{
          alert("Error: "+response.status)
        }
          
        return false;
      }else{
        //Successful
        this.setState({useralready:false,successful:true})
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }))
        return true;
      }
    })
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <EmailForm emailValue={this.state.email} handleEmailChange ={this.handleEmailChange}/>;
      case 1:
        return <UserForm usernameValue={this.state.username} handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange} handleConfirmPasswordChange={this.handleConfirmPasswordChange} alreadyUsername={this.state.useralready}/>;
      case 2:
        return <MoreForm />;
      default:
        throw new Error('Unknown step');
    }
  }

  state = {
    open: false
  };

  checkExistEmail(){
    fetch('https://ride-hub.herokuapp.com/api/signup/checkemail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email
      })
    }).then(response =>{
      if(response.status==200){
        console.log("Email OK")
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
        return true;
      }else{
        //User already
        alert("Email existed")
        return false;
      }
    })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleEmailChange = (event) =>{
    this.setState({email:event.target.value})
  }

  handleUsernameChange = (event)=>{
    this.setState({username:event.target.value})
  }

  handlePasswordChange = (event)=>{
    //NEED to HASH event.target.value before setState;
    var validatePw = validatePassword(event.target.value);
    // var hashedPassword = passwordHash.generate(event.target.value);
    this.setState({password:event.target.value,validatePw:validatePw})
  }

  handleConfirmPasswordChange = (event)=>{
    //NEED to HASH event.target.value before setState
    var isSamePassword = (this.state.password===event.target.value);
    this.setState({confirmpassword:isSamePassword})
  }

  handleNext = () => {
    //Check Correct Email on state 0
    if(this.state.activeStep===0){
      if(validateEmail(this.state.email)){
        this.checkExistEmail()
      }else{
        this.setState({ open: true, message: "Invalid Email" });
      }
    }
    //Check Same Password on state 1
    else if(this.state.activeStep===1){
      if(validateUserName(this.state.username)&&this.state.confirmpassword&&this.state.validatePw){
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }else if(!(validateUserName(this.state.username))){
        this.setState({ open: true, message: "Username only has letters and numbers, between 6 and 20 characters" });
      }else if(!this.state.validatePw){
        this.setState({ open: true, message: "Password has at least 1 letter and 1 number, minimum 8 character" });
      }else if(!this.state.confirmpassword){
        this.setState({ open: true, message: "Password and Re-typed Password does not match" });
      }
    }
    else if(this.state.activeStep===2){
      this.setState({ open: true, message: "Signing up" });
      if(this.signUp()){
        
      }else if(this.state.useralready){
        
      }
    }
    
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep, message } = this.state;
    return (
    <React.Fragment>
    <CssBaseline />
    <div>
      <Paper className={classes.root} elevation={1}>
      <Typography component="h1" variant="h4" align="center">
              Sign Up
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for joining us!
                  </Typography>
                  <Typography variant="subtitle1">
                    We have sent an email with an activation link to your email address. In oder to complete the sign-up process, please click the activation link.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        
        message={<span id="message-id" className={classes.message}><ErrorIcon className={classes.icon} />{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>  
    </React.Fragment>
      );
  }
}

export default withStyles(styles)(SignUp);