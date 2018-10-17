import React, { Component } from "react";
import { browserHistory } from 'react-router';
import TextEditor from './textEditor';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import './view-stylesheet/addthread.css';


export default class AddThread extends Component {
  constructor(props){
    super(props);
    this.state = {subforumID:0}
  }
  componentDidMount() {
    browserHistory.push('/addthread/'+this.props.params.subforumID);
    this.setState({subforumID:this.props.params.subforumID})
  }

  render() {
    return (
    <React.Fragment>
    <CssBaseline />
    <div className='add-thread-wrapper'>
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item xs>  
        <Typography variant="h6" gutterBottom>
          <CreateIcon/> Create a post
        </Typography>
        <Divider/>
      </Grid>
      <Grid item xs>
      <TextField
          disabled
          fullWidth
          label="Forum:"
          defaultValue="SubForum > SubSubForum"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
      <div className="comment-post-wrapper">  
        <TextEditor type="add-thread" subforumID={this.state.subforumID}/>
      </div>
      </Grid>
    </Grid>
    </div>
    </React.Fragment>
      );
  }
}

