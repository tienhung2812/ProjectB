import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import maxresdefault from '../../maxresdefault.jpg'
import Cookies from "universal-cookie";

const cookie = new Cookies();

const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });

const styles = {
    avatar: {
      margin: 0,
      width: 80,
      height: 80,
    },
    button: {
      margin: theme.spacing.unit,
    },
  };
function Profile (props) {
  const { classes } = props;
  if(!props.disabled){
    //Not guest
    var secretcontent = [
      <Grid item xs={6}>
                    <TextField
                    fullWidth
                    disabled={props.disabled}
                    onChange={props.handleFieldChange}
                    defaultValue={props.data.email}
                    name="email"
                    label="Email" 
                    />
            </Grid>,
            <Grid item xs={6}>
            <TextField
            fullWidth
            disabled={props.disabled}
            onChange={props.handleFieldChange}
            defaultValue={props.data.address}
            label="Address" 
            name="address"
            />
          </Grid>,  
          <Grid item xs={6}>
            <TextField
            fullWidth
            disabled={props.disabled}
            onChange={props.handleFieldChange}
            defaultValue={props.data.phone}
            label="Phone number"
            name="phone" 
            />
          </Grid>
    ]
    var saveChangeBtn = <Button variant="contained"  disabled={!props.changed} color="primary" className={classes.button} onClick={props.handleChangeProfile}>
    SAVE CHANGES
  </Button>
  }else{
    var secretcontent = "";
  }
  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Ridehuber information
        </Typography>
        <Divider/>
        <br/>
        <Grid container spacing={40} justify="flex-start" alignItems="flex-end">
            <Grid item xs={6} align="center">
            <Avatar
              alt="Avatar"
              src={maxresdefault}
              className={classes.avatar}
            />
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    disabled={true}
                    defaultValue={props.data.username}
                    label="User name"
                    name="username"
                    />
            </Grid>
            <Grid item xs={6}>
            <TextField
            defaultValue={props.uid}
            disabled={true}
            label="ID"
            variant="outlined"
            />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    disabled={true}
                    defaultValue={props.data.role}
                    label="Role" 
                    name="role"
                    />
            </Grid>
            {secretcontent}
            {/* <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="16/10/2015"
                    label="Creation date" 
                    />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="Vinhayato"
                    label="First name" 
                    />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="Tamari"
                    label="Last name" 
                    />
            </Grid> */}
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    
                    disabled={props.disabled}
                    onChange={props.handleFieldChange}
                    defaultValue={props.data.gender}
                    label="Gender" 
                    name="gender"
                    />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    disabled={props.disabled}
                    onChange={props.handleFieldChange}
                    defaultValue={props.data.birthday}
                    label="Birth date" 
                    name="birthday"
                    />
            </Grid>
            
            <Grid item xs={12} align="right">
            {/* <Button variant="outlined" color="primary" className={classes.button}>
              UNDO
            </Button> */}
            {saveChangeBtn}
            </Grid>
         </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Profile);