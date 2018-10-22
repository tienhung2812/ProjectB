import React, { Component } from "react";
import { browserHistory } from 'react-router';
import TextEditor from './textEditor';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import {Link as ReactLink} from 'react-router';
import './view-stylesheet/addthread.css';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary:{main: '#ff5722'},
  },
});

export default class AddThread extends Component {
  constructor(props){
    super(props);
    this.state = {subforumID:0,title:'',pathloaded:false}
    this.handleTitle = this.handleTitle.bind(this);
  }
  componentDidMount() {
    this.path = null
    browserHistory.push('/addthread/'+this.props.params.subforumID);
    this.setState({subforumID:this.props.params.subforumID})
    fetch('https://ride-hub.herokuapp.com/api/subforum/path/'+this.props.params.subforumID)
    .then(response=>{
      if(response.ok){
        response.json().then(
          data=>{
            data=data[0]
            //console.log(data)
            this.path = 
            <div className="subforumpath-wrapper">
              <div>
                <p> Subforum: </p>
                <ReactLink to={'/subforum/'+data.parent_id} className="subforum-link">{data.parent_title}</ReactLink>
                  <p> > </p>
                <ReactLink to={'/subforum/'+data.child_id} className="subforum-link">{data.child_title}</ReactLink>
              </div>
            </div>
            this.setState({pathloaded:true})
            
          }
        )
      }
    })
  }
  handleTitle=(event)=>{
    this.setState({title:event.target.value})
  }

  render() {
    if(this.state.pathloaded){
      this.pathcontent=this.path
    }
    return (
    <React.Fragment>
    <CssBaseline />
    <div className='add-thread-wrapper'>
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item xs xs={12}>  
        <Typography variant="h6" gutterBottom>
          <CreateIcon/> Create a post
        </Typography>
        <Divider/>
      </Grid>
      <Grid item xs={6}>
      <MuiThemeProvider theme={theme}>
      <TextField
          fullWidth
          label="Title"
          variant="outlined"
          onChange={this.handleTitle}
        />
      </MuiThemeProvider>
      </Grid>
      <Grid item xs>
        {this.pathcontent}
      </Grid>
      
      <Grid item xs={12}>
      <div className="comment-post-wrapper">  
        <TextEditor type="add-thread" subforumID={this.state.subforumID} title={this.state.title}/>
      </div>
      </Grid>
    </Grid>
    </div>
    </React.Fragment>
      );
  }
}

