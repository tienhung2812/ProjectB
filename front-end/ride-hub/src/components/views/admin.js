import React, { Component } from "react";
import ReactDOM from 'react-dom'; 
import { browserHistory } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Profile from './profile';
import Account from './account';
import Noti from './noti';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});



class AdminPanel extends Component {

  DeleteUser(){
    let uid = this.state.username;
    if(uid!=null)
    fetch('https://ride-hub.herokuapp.com/api/user/'+uid, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
          if(response.ok){
            alert("ok role");
            
          }else{
            alert(response.status);
          }
      })
    }
  ChangeRole(){
    fetch('https://ride-hub.herokuapp.com/api/user/modify/role', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:this.state.username,
        role:this.state.role,
      })
    }).then(response => {
        if(response.ok){
          alert("role");
          
        }else{
          alert(response.status);
        }
      })
    }
  CreateForum(){
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();  
    fetch('https://ride-hub.herokuapp.com/api/subforum/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid:this.state.pid,
          title:this.state.title,
          description:this.state.description,
          creation_date:date
        })
      }).then(response => {
          if(response.ok){
            alert("created");
          }else{
            alert(response.status);
          }
      })    
  }
  UpdateForum(){
    fetch('https://ride-hub.herokuapp.com/api/subforum/'+this.state.pid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title:this.state.title,
        description:this.state.description,
      })
    }).then(response => {
        if(response.ok){
          alert("updated");       
        }else{
          alert(response.status);
        }
      })
    }
  DeleteForum(){
    fetch('https://ride-hub.herokuapp.com/api/subforum/'+this.state.pid, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
        if(response.ok){
          alert("Deleted");       
        }else{
          alert(response.status);
        }
      })
    }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeFlex = name => event => {
    this.setState({ [name]: event.target.value });
  };

  constructor(props){
    super(props);
    
    this.state = { username:null,value:0,role:'',pid:'',title:'',description:''}
    this.DeleteUser = this.DeleteUser.bind(this)
    this.ChangeRole = this.ChangeRole.bind(this)
    this.CreateForum = this.CreateForum.bind(this)
    this.UpdateForum = this.UpdateForum.bind(this)
    this.DeleteForum = this.DeleteForum.bind(this)
    
  }
  componentDidMount() {
    browserHistory.push('/admin');
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    
    return (
    <React.Fragment>
    <CssBaseline />
    <div>
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
          <Tab label="DASHBOARD" />
          <Tab label="USER" />
          <Tab label="FORUM" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>
        <Typography component="div" className={classes.chartContainer}>
              <SimpleLineChart />
        </Typography>
        <br/>
        <Grid container spacing={32}>
            <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
            Threads created today
            </Typography>
            <div className={classes.tableContainer}>
              <SimpleTable />
            </div>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
            Posts created today
            </Typography>
            <div className={classes.tableContainer}>
              <SimpleTable />
            </div>
            </Grid>
        </Grid>
 
      </TabContainer>}
      {value === 1 && <TabContainer>
      <Grid container spacing={32} alignItems="flex-end">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
          User modification
          </Typography>
          <Divider/>
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            fullWidth 
            variant="outlined"
            label="Username"
            onChange={this.handleChangeFlex('username')}
            />
        </Grid>
        <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="role-native-simple">Role</InputLabel>
          <Select
            native
            value={this.state.role}
            onChange={this.handleChangeFlex('role')}
            inputProps={{
              name: 'role',
              id: 'role-native-simple',
            }}
          >
            <option value="" />
            <option value={'Admin'}>Admin</option>
            <option value={'Moderator'}>Moderator</option>
            <option value={'User'}>User</option>
          </Select>
        </FormControl>
      
        </Grid>
        <Grid item xs={12} align="right">
        <Button variant="outlined" color="primary" onClick={this.DeleteUser}  className={classes.button}>
          DELETE USER
        </Button>
        <Button variant="contained" color="primary" onClick={this.ChangeRole} className={classes.button}>
          SAVE CHANGES
        </Button>
        
        </Grid>
      </Grid> 
      </TabContainer>}
      {value === 2 && <TabContainer>
        <Grid container spacing={32} alignItems="flex-end">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
          Create/Edit Subforum
          </Typography>
          <Divider/>
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="pid"
          variant="outlined"
          fullWidth
          onChange={this.handleChangeFlex('pid')}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="title"
          variant="outlined"
          fullWidth
          onChange={this.handleChangeFlex('title')}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="description"
          variant="outlined"
          fullWidth
          onChange={this.handleChangeFlex('description')}
        />
        </Grid>
        <Grid item xs={12} align="right">
        <Button variant="contained" color="primary" onClick={this.CreateForum} className={classes.button}>
          CREATE
        </Button>
        <Button variant="contained" color="primary" onClick={this.UpdateForum} className={classes.button}>
          UPDATE
        </Button>
        <Button variant="contained" color="primary" onClick={this.DeleteForum} className={classes.button}>
          DELETE
        </Button>
        
        </Grid>
      </Grid> 
      </TabContainer>}
      </Paper>
    </div>  
    </React.Fragment>
      );
  }
}

export default withStyles(styles)(AdminPanel);