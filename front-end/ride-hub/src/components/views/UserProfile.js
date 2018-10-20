import React, { Component } from "react";
import { browserHistory } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Profile from './profile';
import Account from './account';
import Noti from './noti';
import Typography from '@material-ui/core/Typography';
import Cookies from "universal-cookie";

const cookie = new Cookies();

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password){
  var re = /^\S(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return re.test(password);
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

var guest;

class UserProfile extends Component {
  state = {
    value: 0,
    data:{"username":"anonymous","avatar":{"type":"Buffer","data":null},"point":0,"gender":"Female","address":null,"phone":null,"description":null,"birthday":null},
    loadDone:false,
    username:null,
    gender:null,
    address:null,
    phone:null,
    desciption:null,
    birthday:null,
    email:null,
    changed:false,
    uid:null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props){
    super(props);
  }
  componentDidMount() { 
    this.uid = cookie.get('userid');
    this.paramsid = this.props.params.guestid;
    if(this.uid==null&&this.paramsid==null){
      browserHistory.push('/');
    }else{
      if(this.uid==this.paramsid){
        guest = false;
        this.fetchData(this.uid)
      }else{
        guest=true;
        this.fetchData(this.paramsid)
      }
    }
}
  componentDidUpdate(prevProps){
    if(prevProps.params.guestid!= this.props.params.guestid){
      this.setState({
        value: 0,
        data:{"username":"anonymous","avatar":{"type":"Buffer","data":null},"point":0,"gender":"Female","address":null,"phone":null,"description":null,"birthday":null},
        loadDone:false,
        username:null,
        gender:null,
        address:null,
        phone:null,
        desciption:null,
        birthday:null,
        email:null,
        changed:false,
        uid:null
      })
      this.child = ""
      this.uid = cookie.get('userid');
      this.paramsid = this.props.params.guestid;
      if(this.uid==null&&this.paramsid==null){
        browserHistory.push('/');
      }else{
        if(this.uid==this.paramsid){
          guest = false;
          this.fetchData(this.uid)
        }else{
          guest=true;
          this.fetchData(this.paramsid)
        }
      }
    }
    
  }

  fetchData(uid){
    fetch('https://ride-hub.herokuapp.com/api/user/'+uid+'/details')
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
                  uid:uid,
                  username:data.username,
                  gender:data.gender,
                  address:data.address,
                  phone:data.phone,
                  desciption:data.desciption,
                  birthday:data.birthday,
                  email:data.email,
                  data:data,
                  loadDone:true
                })
              }
              
            )
            // this.setState({data:samepleData,loadDone:true})
          
        }
    })
  }

  handleFieldChange=(event)=>{
    this.setState({ [event.target.name]: event.target.value ,changed:true});
  }
  checkExistEmail(callback){
    if(this.state.email!=this.state.data.email)
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
      if(response.ok){
        console.log("ok")
        callback();
        return true;
      }else{
        //User already
        alert("Email existed")
        return false;
      }
    })
  }

  changeProfile = ()=>{
    var body = 
    JSON.stringify({     
        avatar: this.state.data.avatar,
        gender:this.state.gender,
        address:this.state.address,
        phone:this.state.phone,
        desciption:this.state.desciption,
        birthday:this.state.birthday,
        email:this.state.email
    })
    console.log(body)
    const url = 'https"//ride-hub.herokuapp.com/api/user/';
    console.log(url)
    fetch('https://ride-hub.herokuapp.com/api/user', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email
      })
    }).then(response=>{
      if(!response.ok){
        alert('Error: '+response.status)
      }else{
        alert('Update successfully')
        browserHistory.push('/UserProfile/'+this.state.uid);
      }
    })
  }

  handleChangeProfile = ()=>{
    //Check All
    if(this.uid===this.paramsid)
      if(this.state.email!=this.state.data.email){
        if(validateEmail(this.state.email)){
          this.checkExistEmail(this.changeProfile)
        }else{
          alert("Invalid email")
        }
      }else{
        this.changeProfile();
      }
        
    else{
      alert('Can not change other profile')
    }
    
  }

  handleChangePassword = () =>{

  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if(this.state.loadDone){
      if(!guest){
        this.child = <div>
          <Paper className={classes.root} elevation={1}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Profile" />
              <Tab label="Account" />
              {/* <Tab label="Notifications" /> */}
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><Profile disabled={guest} changed={this.state.changed} uid={this.state.uid} data={this.state.data} handleFieldChange={this.handleFieldChange} handleChangeProfile={this.handleChangeProfile}/></TabContainer>}
          {value === 1 && <TabContainer><Account  disabled={guest} uid={this.state.uid} data={this.state.data} handleChangePassword={this.handleChangePassword} /></TabContainer>}
          {/* {value === 2 && <TabContainer><Noti  disabled={guest}  uid={this.state.uid} data={this.state.data}/></TabContainer>} */}
          </Paper>
        </div>  
      }else{
        this.child = <div>
          <Paper className={classes.root} elevation={1}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Profile" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><Profile disabled={guest} uid={this.state.uid} data={this.state.data} /></TabContainer>}
          </Paper>
        </div>  
      }
      
    }
    return (
    <React.Fragment>
    <CssBaseline />
      {this.child}
    </React.Fragment>
      );
  }
}

export default withStyles(styles)(UserProfile);