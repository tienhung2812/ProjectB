import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
import { browserHistory } from 'react-router';
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
import Cookies from "universal-cookie";

const cookie = new Cookies();
const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });


class AccountDropDown extends Component {
  constructor(props){
    super(props);
    this.state= {forgotPW:false,
        forgotBtnTitle:"FORGOT PASSWORD",
        signinBtnTitle:"SIGN IN",
        isLogged:false, 
        username:"anoymous", 
        email:null,
        point:0,
        gender:null,
        address:null,
        phone:null,
        description:null,
        birthday:null,
        pw:null,
        loggingin:false,
        loginSucess:true}
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleUsername =this.handleUsername.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.setCookie = this.setCookie.bind(this);
    this.fetchUserSummaryInfo = this.fetchUserSummaryInfo.bind(this);
    this.handleBtnForgetPassword = this.handleBtnForgetPassword.bind(this);
    this.handleBtnSignIn = this.handleBtnSignIn.bind(this);
    this.handleForgetPassword = this.handleForgetPassword.bind(this);
    if(cookie.get("userid")==null){
        this.setState({isLogged:false});
        this.setState({username:"anoymous", point:0})
    }else{
        var uid = cookie.get("userid");
        this.fetchUserSummaryInfo(uid);
    }
  }

  fetchUserSummaryInfo(uid){
    fetch('https://ride-hub.herokuapp.com/api/user/'+uid+'/summary')
    .then(response=>{
        if(response.status!==200){
            //User fault
            this.setState({isLogged:false});
            this.setState({username:"anoymous", point:0})
            cookie.remove('userid');
            cookie.remove('role');
        }else{
            //Correct user
            response.json().then(
                data=>{
                    this.setState({
                        isLogged:true,
                        username:data.username,
                        point:data.point
                    })
                }
            )
        }
    })
  }

  handleSignIn(){
    this.setState({loggingin:true})
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
      }).then(response => {
          if(response.status===200){
              response.json().then(
                  json=>{
                    this.setCookie(json);
                    this.fetchUserSummaryInfo(json.userid)
                    this.setState({isLogged:true,loggingin:false,pw:null,loginSucess:true,open:false})
                  }
              );
          }else{
            this.setState({isLogged:false,loggingin:false,pw:null,loginSucess:false})
          }
      })
    }
  handleLogOut(){
      
    fetch('https://ride-hub.herokuapp.com/api/logout', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: this.state.username
    })
    }).then(response=>{
        if(response.status==200){
        
        }else{
            alert("Log out fail")
        }
    })
    this.setState({isLogged:false,loggingin:false,open:false})
    cookie.remove("role");
    cookie.remove("userid");
    cookie.remove('connect.sid');
    browserHistory.push('/');
     
  }

  setCookie(data){
    cookie.set("role", data.role, {path: "/"});
    cookie.set("userid", data.userid, {path: "/"});
  }

  getCookieExpireDate(minutes){
      console.log(new Date(new Date().getTime()+1000*minutes).toUTCString())
    return new Date(new Date().getTime()+1000*minutes).toUTCString()
}

    handleBtnForgetPassword(){
        if(this.state.forgotPW)
            this.setState({forgotPW:false,forgotBtnTitle:"FORGOT PASSWORD",signinBtnTitle:"SIGN IN"})
        else{
            this.setState({forgotPW:true,forgotBtnTitle:"BACK TO SIGN IN",signinBtnTitle:"GET PASSWORD"})
        }
    }

    handleBtnSignIn(){
        if(this.state.forgotPW){
            this.handleForgetPassword()
        }else{
            this.handleSignIn();
        }
    }

    handleForgetPassword(){
        if(this.state.email!=null&&this.validateEmail(this.state.email)){
            fetch('https://ride-hub.herokuapp.com/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:this.state.email
                })
                }).then(response =>{
                if(response.status!==200){
                    //User already
                    if(response.status==400)
                        alert("No email found")
                    else
                        alert("Error: "+response.status)
                    return false;
                }else{
                    //Successful
                   alert("Check your email");
                   this.setState({forgotPW:false,forgotBtnTitle:"FORGOT PASSWORD",signinBtnTitle:"SIGN IN"})
                }
            })
        }else{
            alert("Invalid email")
        }

    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
  componentDidMount(){
    this.childcontent=[];
    this.signin = 
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
    ]
    this.defaultForgotDialogContent=[
        <Grid item xs={12}>
            <TextField
            fullWidth
            label="Email"
            variant="outlined"
            onChange={this.handleEmailChange}
            inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$", title:"Invalid Email"}}
            />
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

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
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
    }else if(this.state.forgotPW){
        signInDialogContent = this.defaultForgotDialogContent
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
                <Grid item xs={6}>
                    <MuiThemeProvider theme={theme}>
                        <Button onClick={this.handleBtnSignIn} variant="contained" color="primary" size="large" fullWidth >
                        {this.state.signinBtnTitle}
                        </Button>
                    </MuiThemeProvider>
                    
                    </Grid>
                    
                    <Grid item xs={7}></Grid>
                    
                    <Grid item xs={6}>
                        New to Ride hub ?
                        <ReactLink to={'/signup'}>
                        <MuiThemeProvider theme={theme}>
                        <Button color="primary" onClick={this.handleClose}>SIGN UP</Button>
                        </MuiThemeProvider>
                        </ReactLink>
                    </Grid>
                    <Grid item xs={5}  align="right">
                    <MuiThemeProvider theme={theme}>
                    <Button color="primary" onClick={this.handleBtnForgetPassword}>{this.state.forgotBtnTitle}</Button>
                    </MuiThemeProvider>
                    </Grid>
            </Grid>
            </form>     
            <Typography variant="caption" gutterBottom>By signing in, you agree to our use of cookies.</Typography>
            </DialogContent>
            </Dialog>
            </div>
        )
        this.childcontent.push(
            <ReactLink to={'/signup'}>
                <button className="dropdown-item" type="button">
                    Sign up
                </button>
            </ReactLink>
        );
    }else{
        this.childcontent = []
        if(cookie.get('role')==='Admin'){
            this.childcontent.push(<ReactLink to={'/admin'}><button className="dropdown-item" type="button" > Admin Page </button></ReactLink>)
        }
        this.childcontent.push(
           
            <ReactLink to={'/UserProfile/'+cookie.get('userid')}><button className="dropdown-item" type="button" > My Account </button></ReactLink>
           
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
