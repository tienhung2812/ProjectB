import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import maxresdefault from '../../maxresdefault.jpg'

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
  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Your Ridehub information
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
                    defaultValue="Vintama"
                    label="User name"
                    />
            </Grid>
            <Grid item xs={6}>
            <TextField
            defaultValue="025729274"
            label="ID"
            variant="outlined"
            />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="Moderator"
                    label="Role" 
                    />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="Apache Helicopter"
                    label="Gender" 
                    />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="19/11/1997"
                    label="Birth date" 
                    />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="1st Somewhere Str."
                    label="Address" 
                    />
            </Grid>
            <Grid item xs={6}>
                    <TextField
                    fullWidth
                    defaultValue="0123456789"
                    label="Phone number" 
                    />
            </Grid>
            <Grid item xs={12} align="right">
            <Button variant="outlined" color="primary" className={classes.button}>
              UNDO
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              SAVE CHANGES
            </Button>
            </Grid>
         </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Profile);