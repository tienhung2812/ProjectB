import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });
  

const styles = {
    button: {
      margin: theme.spacing.unit,
    },
  };

function Noti (props) {
  const { classes } = props;

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Notification setting
        </Typography>
        <Divider/>
        <br/>
        <Switch
          color="primary"
        /> Email notifications
          
        
    </React.Fragment>
  );
}

export default withStyles(styles)(Noti);