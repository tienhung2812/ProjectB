import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });

function EmailForm(props) {
  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Join the worldwide conversation.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>By having a Ridehub account, you can subscribe, vote, and comment on all your favorite Ridehub content.</Typography>
        <Typography variant="subtitle1" gutterBottom>Sign up in just seconds.</Typography>
        <Grid container spacing={24}>
            <Grid item xs={12}><Divider/></Grid>
            <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
                <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                onChange={props.handleEmailChange}
                />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
            Already a Ridehuber ?
            <MuiThemeProvider theme={theme}>
            <Button color="primary">LOG IN</Button>
            </MuiThemeProvider>
            </Grid>
         </Grid>
         <Typography variant="caption" gutterBottom>By signing up, you agree to our Terms and that you have read our Privacy Policy and Content Policy.</Typography>
    </React.Fragment>
  );
}

export default EmailForm;