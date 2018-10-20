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
                var defaultdata={};
                var i = 0;
                for( var key in data){
                  i++;
                  let a ="";
                  if(data[key]!=null){
                    a = data[key]
                  }
                  this.setState({[key]: a})
                  defaultdata[key]=a;
                  if(i==Object.keys(data).length)
                    this.setState({uid:uid,data:defaultdata,loadDone:true})
                }
                
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
    var check =true;
    //Email
    var email;
    if(this.state.email == this.state.data.email){
      email = this.state.data.email;
    }else{
      if(this.state.email!=null||this.state.email=="")
        email = this.state.email;
    }
    //Gender
    var gender;
    if(this.state.gender == this.state.data.gender){
      gender = this.state.data.gender;
    }else{
      if((this.state.gender!=null||this.state.gender!="")&&(this.state.gender=="Male"||this.state.gender=="Female")){
        gender = this.state.gender;
      }else{
        alert("Invalid gender")
        check = false;
      }
    }
    //Address
    var address;
    if(this.state.address==this.state.data.address){
      address = this.state.data.address;
    }else{
      if(this.state.address!=null){
        address = this.state.address
      }else{
        alert("Invalid address")
        check = false;
      }
    }

    var phone;
    if(this.state.phone==this.state.data.phone){
      phone = this.state.data.phone;
    }else{
      if(this.state.phone!=null){
        phone = this.state.phone
      }else{
        alert("Invalid phone")
        check = false;
      }
    }
    //Phone number must <10
    if(phone.length>10){
      alert("Phone number must smaller than 10")
      check = false
    }

    var description;
    if(this.state.description==this.state.data.description){
      description = this.state.data.description;
    }else{
      if(this.state.description!=null){
        description = this.state.description
      }else{
        alert("Invalid description")
        check = false;
      }
    }

    var birthday;
    if(this.state.birthday==this.state.data.birthday){
      birthday = this.state.data.birthday;
    }else{
      if(this.state.birthday!=null){
        birthday = this.state.birthday
      }else{
        alert("Invalid birthday")
        check = false;
      }
    }

    var body = 
    JSON.stringify({     
        avatar: this.state.data.avatar,
        gender:gender,
        address:address,
        phone:phone,
        description:description,
        birthday:birthday,
        email:email
    })

    console.log(check+body);
    if(check){
      fetch('https://ride-hub.herokuapp.com/api/user', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body
      }).then(response=>{
        if(!response.ok){
          alert('Error: '+response.status)
        }else{
          alert('Update successfully')
          browserHistory.push('/UserProfile/'+this.state.uid);
        }
      })
    }
    
  }

  handleChangeProfile = ()=>{
    //Check All
    if(this.uid===this.paramsid)
      if((this.state.email!=this.state.data.email)){
        if((this.state.email!=="")){
          if(validateEmail(this.state.email)){
            this.checkExistEmail(this.changeProfile)
          }else{
            alert("Invalid email")
          }
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