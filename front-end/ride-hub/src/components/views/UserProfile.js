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
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props){
    super(props);
  }
  componentDidMount() {
    browserHistory.push('/UserProfile');
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
          <Tab label="Profile" />
          <Tab label="Account" />
          <Tab label="Notifications" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><Profile/></TabContainer>}
      {value === 1 && <TabContainer><Account/></TabContainer>}
      {value === 2 && <TabContainer><Noti/></TabContainer>}
      </Paper>
    </div>  
    </React.Fragment>
      );
  }
}

export default withStyles(styles)(UserProfile);