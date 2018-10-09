import React, { Component } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 
import './view-stylesheet/textEditor.css';

import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  palette: {
    primary:{main: '#ff5722'},
  },
});

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.textInput = React.createRef();
    
  }
  componentDidMount() {
    this.modules= {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          [ 'image','video'],
          ['clean']
        ],
      }
    
    this.formats= [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
  }

  handlePost(){
    var text = this.textInput.current.getEditor().getContents();
    this.textInput.current.getEditor().setContents([{ insert: '\n' }]);;
    console.log(text);
  }

  render() {
    if(this.props.type==='comment'){ 
      return (
      <React.Fragment>
        <CssBaseline />
        <div className={this.props.type}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ReactQuill 
              theme="snow"
              modules={this.modules}
              formats={this.formats} 
              placeholder={'What are your thoughts ?'}
              ref={this.textInput}
            />
          </Grid>
          <Grid item xs={12} align="right">
            <MuiThemeProvider theme={theme}>
              <Button variant="contained" color="primary">
                COMMENT
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>    
        </Grid>
        
        </div>
      </React.Fragment>  
      );
    }else{
      return (
      <React.Fragment>
      <CssBaseline />
      <div className={this.props.type}>
      <Grid container spacing={24} alignItems="flex-end">
        <Grid item xs={12}>
          <ReactQuill 
            theme="snow"
            modules={this.modules}
            formats={this.formats} 
            placeholder={'Text (optional)'}
            ref={this.textInput}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Add Tag(s)"
            placeholder="#Tag"
            fullWidth
            error
          />
        </Grid>
        <Grid item xs align="right">
          <MuiThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
              POST
            </Button>
          </MuiThemeProvider>
        </Grid> 
      </Grid>
      
      </div>
      </React.Fragment> 
      );
    }
  }
}

