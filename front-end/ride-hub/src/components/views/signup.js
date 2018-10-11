import React, { Component } from "react";
import { browserHistory } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
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


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
});

const steps = ['', '', ''];

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkSamePasswordAndNull(password,retypepassword){
  return (password!==null)&&(retypepassword!==null)&&(password===retypepassword);
}

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={activeStep:0,email:null,username:null,password:null,confirmpassword:null}
  }
  componentDidMount() {
    browserHistory.push('/signup');
  }
  

  getStepContent(step) {
    switch (step) {
      case 0:
        return <EmailForm handleEmailChange ={this.handleEmailChange}/>;
      case 1:
        return <UserForm handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange} handleConfirmPasswordChange={this.handleConfirmPasswordChange}/>;
      case 2:
        return <MoreForm />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleEmailChange = (event) =>{
    this.setState({email:event.target.value})
  }

  handleUsernameChange = (event)=>{
    this.setState({username:event.target.value})
  }

  handlePasswordChange = (event)=>{
    //NEED to HASH event.target.value before setState
    this.setState({password:event.target.value})
  }

  handleConfirmPasswordChange = (event)=>{
    //NEED to HASH event.target.value before setState
    this.setState({confirmpassword:event.target.value})
  }

  handleNext = () => {
    //Check Correct Email on state 0
    if(this.state.activeStep===0){
      if(validateEmail(this.state.email)){
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }else{
        alert("Wrong Email")
      }
    }
    //Check Same Password on state 1
    else if(this.state.activeStep===1){
      if(checkSamePasswordAndNull(this.state.password,this.state.confirmpassword)){
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }else{
        alert("Password not same")
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
    const { activeStep } = this.state;
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
    </div>  
    </React.Fragment>
      );
  }
}

export default withStyles(styles)(SignUp);