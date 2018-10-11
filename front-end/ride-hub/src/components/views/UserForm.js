import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });
function UserForm(props) {
  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Choose your username
        </Typography>
        <Typography variant="subtitle1" gutterBottom>Your username is how other community members will see you. This name will be used to credit you for things you share on Ridehub.</Typography>
        <Typography variant="subtitle1" gutterBottom>What should we call you ?</Typography>
        <Grid container spacing={24}>
            <Grid item xs={12}><Divider/></Grid>
            <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    onChange={props.handleUsernameChange}
                    />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={props.handlePasswordChange}
                    />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    type="password"
                    label="Confirm password"
                    variant="outlined"
                    onChange={props.handleConfirmPasswordChange}
                    />
            </MuiThemeProvider>
            </Grid>
         </Grid>
    </React.Fragment>
  );
}

export default UserForm;