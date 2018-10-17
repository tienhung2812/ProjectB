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
    this.state = {
      disabledBtn:false,
      subforumID:""
    }
    this.handlePost = this.handlePost.bind(this);
    this.handleThread = this.handleThread.bind(this);
    this.textInput = React.createRef();
    this.titleInput = React.createRef();
    
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
    this.setState({disabledBtn:true})
    var rawtext = this.textInput.current.getEditor().getContents();
    var text = [];
    for(let i=0;i<rawtext.ops.length;i++){
      text.push(rawtext.ops[i])
    }
    var date = this.getDateTime()
    var body = JSON.stringify({
      content: text,
      creation_date : date,
      threadid : this.props.threadid,
      pid : this.props.pid})
    console.log(body)
    if(this.textInput.current.getEditor().getText().length<2){
      alert("Comment can't be null");
      return null;
    }
    fetch('https://ride-hub.herokuapp.com/api/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
      }).then(response=>{
        console.log("Reponse status: "+response.status)
        if(response.status===200){
          ///Post ok
          alert("Commented")
          this.textInput.current.getEditor().setContents([{ insert: '\n' }]);;
        }else{
          //Post not ok
          if(response.status==403){
            alert("You must log in to use this feature")
          }else
            alert("Comment failed")
        }
        this.setState({disabledBtn:false})
      })
  }

  handleThread(){
    this.setState({disabledBtn:true})
    var rawtext = this.textInput.current.getEditor().getContents();
    var text = [];
    for(let i=0;i<rawtext.ops.length;i++){
      text.push(rawtext.ops[i])
    }
    var date = this.getDateTime()
    var forumid = this.props.subforumID
    var tag = 1;
    var userid = 1;
    var title = this.props.title;
    var body = JSON.stringify({
      title:title,
      userid:userid,
      forumid:forumid,
      creation_date:date,
      thumbnail:null,
      tagid:tag,
      content:text
    })
    console.log(body)
    if(title.length===0){
      alert("Title can't be null");
      return null;
    }else if(this.textInput.current.getEditor().getText().length<2){
      alert("Content can't be null");
      return null;
    }
    fetch('https://ride-hub.herokuapp.com/api/thread', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body}).then(response=>{
        console.log("Reponse status: "+response.status)
        if(response.status===200){
          ///Post ok
          alert("Posted")
          this.textInput.current.getEditor().setContents([{ insert: '\n' }]);;
        }else{
          //Post not ok
          if(response.status==403){
            alert("You must log in to use this feature")
          }else
            alert("Post failed")
        }
        this.setState({disabledBtn:false})
      })
  }

  getDateTime(){
    let currentdate = new Date(); 
    let a =  currentdate.getFullYear()+ "-"+ (currentdate.getMonth()+1) + "-"+ currentdate.getDate() + " "+ currentdate.getHours() + ":"  + currentdate.getMinutes() + ":"  + currentdate.getSeconds();
    return a;
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
              <Button variant="contained" color="primary" onClick={this.handlePost} disabled={this.state.disabledBtn}>
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
            placeholder={'Text '}
            ref={this.textInput}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
          
            label="Add Tag(s)"
            placeholder="#Tag"
            fullWidth
            error
          />
        </Grid>
        <Grid item xs align="right">
          <MuiThemeProvider theme={theme}>
            <Button variant="contained" color="primary" onClick={this.handleThread}>
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

