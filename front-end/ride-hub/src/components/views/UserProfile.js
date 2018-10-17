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



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});



class UserProfile extends Component {
  state = {
    value: 0,
    data:{"username":"anonymous","avatar":{"type":"Buffer","data":null},"point":0,"gender":"Female","address":null,"phone":null,"description":null,"birthday":null},
    loadDone:false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props){
    super(props);
  }
  componentDidMount() {
    browserHistory.push('/UserProfile');
    this.uid = cookie.get('userid');
    this.child;
    if(this.uid==null){
      alert("You must log in to use this function");
      browserHistory.push('/');
    }else{
      console.log(this.uid)
      fetch('https://ride-hub.herokuapp.com/api/user/'+this.uid+'/details')
    .then(response=>{
        if(response.status!==200){
            //User fault
            this.setState({isLogged:false});
            this.setState({username:"anoymous", point:0})
            cookie.remove('userid');
            cookie.remove('role');
        }else{
            //Correct user
            let samepleData = {"username":"user1","avatar":{"type":"Buffer","data":[68,58,92,83,111,102,116,119,97,114,101,92,78,111,100,101,74,83,92,82,105,100,101,72,117,98,92,102,114,111,110,116,45,101,110,100,92,100,101,115,105,103,110,92,83,107,101,116,99,104,92,73,109,97,103,101,115,92,100,101,102,97,117,108,116,32,97,118,97,116,97,114,46,112,110,103]},"point":0,"gender":"Female","address":null,"phone":null,"description":null,"birthday":null}
            // const contentType = response.headers.get("content-type");
            // if (contentType && contentType.indexOf("application/json") !== -1) {
            //   return response.json().then(data => {
            //     this.setState({
            //       data:data
            //   })
            //   });
            // } else {
            //   return response.text().then(text => {
            //     console.log(text);
            //     alert('User not found')
            //   });
            // }
            this.setState({data:samepleData,loadDone:true})
          
        }
    })
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    if(this.state.loadDone){
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
          <Tab label="Notifications" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><Profile uid={this.uid} data={this.state.data}/></TabContainer>}
      {value === 1 && <TabContainer><Account  uid={this.uid} data={this.state.data}/></TabContainer>}
      {value === 2 && <TabContainer><Noti  uid={this.uid} data={this.state.data}/></TabContainer>}
      </Paper>
    </div>  
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