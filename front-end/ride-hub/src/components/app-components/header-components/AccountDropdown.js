import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
import Loader from '../Loader';
import '../../stylesheet/Header.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });
  

class AccountDropDown extends Component {
  constructor(props){
    super(props);
    this.state= {isLogged:false, username:"anoymous", point:0,gender:null,address:null,phone:null,description:null,birthday:null,pw:null,loggingin:false,loginSucess:true}
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleUsername =this.handleUsername.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleSignIn(){
    this.setState({loggingin:true})
    console.log('singin')
    fetch('https://ride-hub.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.pw,
        })
      }).then(response =>{
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            //Wrong 
            this.setState({isLogged:false,loggingin:false,pw:null,loginSucess:false})

        } else {
            //Correct
            this.setState({isLogged:true,loggingin:false,pw:null,loginSucess:true,open:false})
            
        }
      })
  }

  handleLogOut(){
      this.setState({isLogged:false,loggingin:false,open:false})
  }

  componentDidMount(){
    this.childcontent=[];
    
    this.defaultSignInDialogContent=[
        <Grid item xs={12}>
            <TextField
            fullWidth
            label="Username"
            variant="outlined"
            onChange={this.handleUsername}
            inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$", title:"Invalid Email"}}
            />
        </Grid>,
        <Grid item xs={12}>
        <TextField
        fullWidth
        id="outlined-adornment-password"
        variant="outlined"
        type={this.state.showPassword ? 'text' : 'password'}
        label="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
                >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            ),
        }}
        />
        </Grid>
        ,
        <Grid item xs={6}>
        <MuiThemeProvider theme={theme}>
            <Button onClick={this.handleSignIn} variant="contained" color="primary" size="large" fullWidth >
            SIGN IN
            </Button>
        </MuiThemeProvider>
        
        </Grid>
        ,
        <Grid item xs={7}></Grid>
        ,
        <Grid item xs={6}>
            New to Ride hub ?
            <ReactLink to={'/signup'}>
            <MuiThemeProvider theme={theme}>
            <Button color="primary" onClick={this.handleClose}>SIGN UP</Button>
            </MuiThemeProvider>
            </ReactLink>
        </Grid>
        ,
        <Grid item xs={6}  align="right">
        <MuiThemeProvider theme={theme}>
        <Button color="primary">FORGOT PASSWORD</Button>
        </MuiThemeProvider>
        </Grid>
    ]
  }
  state = {
    open: false,
    password: '',
    showPassword: false,
  };

  handleUsername(event){
      this.setState({username:event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({ pw: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleClickOpen = () => {
    this.setState({ open: true });

  };

  handleClose = () => {
    this.setState({ open: false });
  };
  

  render() { 
    
    //Set variable
    var signInDialogContent;
    var status;
    if(!this.state.loggingin&&!this.state.isLogged&&!this.state.loginSucess){
        status = <p style={{color:"red"}}>Incorrect username or password</p>
    }else{
        status = ""
    }
    if(this.state.loggingin&&!this.state.isLogged){
        signInDialogContent = 
        <div style={{width:"568px"}}>
            <Loader/>
        </div>
    }else{
        signInDialogContent = this.defaultSignInDialogContent
    }

    if(!this.state.isLogged){
        this.childcontent = []
        this.childcontent.push(
            <div>
            <button className="dropdown-item" onClick={this.handleClickOpen} >Log in</button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
            <DialogContent>
                
            <form>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <div class="row pl-3">
                        <LockIcon/>
                        <Typography variant="h6" gutterBottom alignItems="flex-end" >
                        &nbsp;Sign in
                        </Typography>    
                    </div>  
                <Divider/>   
                </Grid>
                {status}
                {signInDialogContent}
              
            </Grid>
            </form>     
            </DialogContent>
            </Dialog>
            </div>
        )
        this.childcontent.push(
            <button className="dropdown-item" type="button">
                <ReactLink to={'/signup'}>
                    Sign up
                </ReactLink>    
            </button>
        );
    }else{
        this.childcontent = []
        this.childcontent.push(
            <ReactLink to={'/UserProfile'}>
            <button className="dropdown-item" type="button" >My Account</button>
            </ReactLink>
        )
        this.childcontent.push(
            <button className="dropdown-item" type="button" onClick={this.handleLogOut}>Log out</button>
        );
    }

    var username;
    if(this.state.isLogged){
        username = this.state.username;
    }else{
        username = "anonymous"
    }

    return (
        <React.Fragment>
        <CssBaseline /> 
        <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar"></div>
                <div className="content">
                    <div className="username">{username}</div>
                    <div className="point">{this.state.point} points</div>
                </div>
                
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                        {this.childcontent}
            </div>
        </div>
        </React.Fragment>
    );
  }
}

export default AccountDropDown;
