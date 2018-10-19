import React, { Component } from "react";
import { browserHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import './view-stylesheet/resetpassword.css'
const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });

function validatePassword(password){
var re = /^\S(?=.*[A-Za-z])(?=.*\d).{8,}$/;
return re.test(password);
}
export default class ResetPassword extends Component {
  constructor(props){
    super(props);
    this.state={loaded:false,searchData:null,password:null,confirmpassword:false}
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    
  }
  handlePasswordChange = (event) =>{
    this.setState({password:event.target.value})
  }

  handleConfirmPasswordChange = (event) =>{
    if(this.state.password!=null){
        var isSamePassword = (this.state.password===event.target.value);
        this.setState({confirmpassword:isSamePassword})
    }
  }
  componentDidMount() {
    if(this.props.params.data==null){
        browserHistory.push('/');
    }else{
        browserHistory.push('/resetpassword/'+this.props.params.data);
        this.child = [
        
        ]
        this.token =this.props.params.data;
    }
  }

  handleResetPassword=()=>{
    let body = JSON.stringify({
        password:this.state.password
    })
    fetch('https://ride-hub.herokuapp.com/api/reset-password/'+this.token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body}).then(response=>{
            if(response.status===200){
                alert('Reset password successful')
                browserHistory.push('/')
            }else{
                alert("Reset password unsuccessful\nError: "+response.status)
            }
        }

      )
  }
  render() {
    if(this.state.password!=null && !this.state.confirmpassword){
        this.errorcontent=[]
        this.errorcontent.push(<p>Password not match</p>)
        if(!validatePassword(this.state.password)){
            this.errorcontent.push(<p>Password has at least 1 letter and 1 number, minimum 8 character</p>)
        }
        this.error = <div style={{color:"red",paddingLeft:"30px"}}>{this.errorcontent}</div>

    }else{
        this.error = ""
    }

    if(this.error==""&&this.state.password!=null){
        this.disable=false;
    }else{
        this.disable=true
    }

    return (
        <div className="main-content">
            <div className="resetpassword-wrapper">
                
                <Typography variant="h6" gutterBottom>
                    Reset Password
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}><Divider/></Grid>
                    {this.error}
                    <Grid item xs={12}>
                    <MuiThemeProvider theme={theme}>
                            <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            onChange={this.handlePasswordChange}
                            />
                    </MuiThemeProvider>
                    </Grid>
                    <Grid item xs={12}>
                    <MuiThemeProvider theme={theme}>
                            <TextField
                            fullWidth
                            type="password"
                            label="Confirm password"
                            variant="outlined"
                            onChange={this.handleConfirmPasswordChange}
                            />
                    </MuiThemeProvider>
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={5} align="right">
                    <MuiThemeProvider theme={theme}>
                        <Button disabled={this.disable} onClick={this.handleResetPassword} variant="contained" color="primary" size="large" fullWidth >
                            Reset Password
                        </Button>
                    </MuiThemeProvider>
                    
                    </Grid>
                </Grid>
            </div>
          
        </div>
    );
  }
}

