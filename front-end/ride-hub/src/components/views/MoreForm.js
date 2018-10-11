import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
const theme = createMuiTheme({
    palette: {
      primary:{main: '#ff5722'},
    },
  });

function MoreForm() {
  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        That's it!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>You've filled all the info we need. Just in case when you'd like everyone to know you better.</Typography>
        <Typography variant="subtitle1" gutterBottom>( Remember, these forms are optional.)</Typography>
        <Grid container spacing={24}>
            <Grid item xs={12}><Divider/></Grid>
            <Grid item xs={4}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    label="First name"
                    />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={4}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    label="Last name"
                    />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={4} align="center">
            Male
            <Switch defaultChecked value="checkedF" color="default" />
            Female
            </Grid>
            <Grid item xs={6}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    label="Country"
                    />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={6}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    label="City"
                    />
            </MuiThemeProvider>
            </Grid>
            <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
                    <TextField
                    fullWidth
                    label="Favorite manufacturer"
                    />
            </MuiThemeProvider>
            </Grid>
         </Grid>
    </React.Fragment>
  );
}

export default MoreForm;