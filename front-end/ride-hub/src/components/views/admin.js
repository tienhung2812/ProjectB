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
  state = {
    value: 0,
  };



  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props){
    super(props);
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
            />
        </Grid>
        <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Role</InputLabel>
          <NativeSelect defaultValue={10} input={<Input name="role" id="uncontrolled-native" />}>
            <option value={10}>User</option>
            <option value={20}>Moderator</option>
            <option value={30}>Admin</option>
          </NativeSelect>
        </FormControl>
      
        </Grid>
        <Grid item xs={12} align="right">
        <Button variant="outlined" color="primary" className={classes.button}>
          DELETE USER
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
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
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="title"
          variant="outlined"
          fullWidth
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="description"
          variant="outlined"
          fullWidth
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="creation_date"
          variant="outlined"
          fullWidth
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="userid"
          variant="outlined"
          fullWidth
        />
        </Grid>
        <Grid item xs={12} align="right">
        <Button variant="contained" color="primary" className={classes.button}>
          SAVE CHANGES
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