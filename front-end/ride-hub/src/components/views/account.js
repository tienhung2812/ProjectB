import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
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
function Account (props) {
  const { classes } = props;
  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Account settings
        </Typography>
        <Divider/>
        <br/>
        {/* <TextField
          name="currentpassword"
          type="password"
          label="Current password (required for editing)"
          variant="outlined"
          onChange={props.handleFieldChange}
          fullWidth
        /> */}
        <br/>
        <br/>
        <Divider/>
        <br/>
        <Grid container spacing={40} justify="flex-start" alignItems="flex-end">
            
            <Grid item xs={6}>
            <Typography variant="subtitle2" gutterBottom>
              Update your password
            </Typography>
            <TextField
            fullWidth
            type="password"
            name="password"
            label="New password" 
            onChange={props.handleFieldChange}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              name="confirmpassword"
              label="Verify password" 
              onChange={props.handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} align="right">
            <Button variant="contained" color="primary" disabled={props.disabled} className={classes.button} onClick={props.handleChangePassword}>
              SAVE CHANGES
            </Button>
            </Grid>
         </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Account);