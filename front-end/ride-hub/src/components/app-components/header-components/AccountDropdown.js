import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
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
    this.state= {isLogged:false, username:"anoymous", point:0,gender:null,address:null,phone:null,description:null,birthday:null}
    
  }

  fetchData(uid){
    fetch('http://ride-hub.herokuapp.com/api/user/'+uid+'/details')
    .then(response => response.json())
    .then(data => {   
      this.setState({
        username:data.username,
        point:data.point,
        gender:data.gender,
        address:data.address,
        phone:data.phone,
        description:data.description,
        birthday:data.birthday
      })
    });
  }

  componentDidMount(){
    this.childcontent=[];
    
    //set temp data:
    sessionStorage.setItem('uid',1);

    if(sessionStorage.getItem('uid')!==null){
        this.setState({isLogged:true})
        let id = sessionStorage.getItem('uid');
        this.fetchData(id)
    }
  }
  state = {
    open: false,
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                fullWidth
                id="outlined-adornment-password"
                variant="outlined"
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                value={this.state.password}
                onChange={this.handleChange('password')}
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
                
                <Grid item xs={6}>
                <MuiThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" size="large" fullWidth>
                    SIGN IN
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
                <Grid item xs={6}  align="right">
                <MuiThemeProvider theme={theme}>
                <Button color="primary">FORGOT PASSWORD</Button>
                </MuiThemeProvider>
                </Grid>
              
            </Grid>       
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
            <button className="dropdown-item" type="button" >My Account</button>
        )
        this.childcontent.push(
            <button className="dropdown-item" type="button">Log out</button>
        );
    }

    return (
        <React.Fragment>
        <CssBaseline /> 
        <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar"></div>
                <div className="content">
                    <div className="username">{this.state.username}</div>
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
