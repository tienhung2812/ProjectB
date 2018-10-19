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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'jvad47ey';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dp9vfrkbu/image/upload';


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
      subforumID:"",
      tag:0,
      tagdata:null
    }
    this.handlePost = this.handlePost.bind(this);
    this.handleThread = this.handleThread.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.textInput = React.createRef();
    this.titleInput = React.createRef();
  }
  componentDidMount() {
    this.modules = {
      toolbar: {
        container: [
        [{ 'header': [1, 2, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
          ],
          handlers: {
            'image':  this.imageHandler
          }
    }
    }
    
    this.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]

      //Fetch tag
    fetch('https://ride-hub.herokuapp.com/api/thread/filter_data')
    .then(response => {
        if(response.status===200){
            response.json().then(data => {
                //Content
                data=data[0];
                this.setState({
                    tagdata:data.tags
                })
            });
        }
    })
  }

  handleImageUpload(file,range) {
    const formData = new FormData();
    formData.append("file",file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios.post(
      CLOUDINARY_UPLOAD_URL,
      formData, 
      { headers: { "X-Requested-With": "XMLHttpRequest" }})
      .then(response => {
        if (response.data.secure_url !== '') {
          // Remove placeholder image
          this.textInput.current.getEditor().deleteText(range.index, 1);
          
          // Insert uploaded image
          this.textInput.current.getEditor().insertEmbed(range.index, 'image', response.data.secure_url); 
        return response.data.secure_url
        }else{
          return "";
        }
      })
    // let upload = request.post(CLOUDINARY_UPLOAD_URL)
    //                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    //                     .field('file', file);

    // upload.end((err, response) => {
    //   if (err) {
    //     console.error(err);
    //   }

    //   if (response.body.secure_url !== '') {
    //       // Remove placeholder image
    //       this.textInput.current.getEditor().deleteText(range.index, 1);
      
    //       // Insert uploaded image
    //       this.textInput.current.getEditor().insertEmbed(range.index, 'image', response.body.secure_url); 
    //     return response.body.secure_url
    //   }else{
    //     return "";
    //   }
  }

  imageHandler = () => {
    const input = document.createElement('input');
  
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
      
      // Save current cursor state
      const range = this.textInput.current.getEditor().getSelection(true);
  
      // Insert temporary loading placeholder image
      this.textInput.current.getEditor().insertEmbed(range.index, 'image', `${ window.location.origin }/images/loaders/placeholder.gif`); 
  
      // Move cursor to right side of image (easier to continue typing)
      this.textInput.current.getEditor().setSelection(range.index + 1);
  
      const res = await this.handleImageUpload(file,range)// API post, returns image location as string e.g. 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg'
      
    
    }
  }

  cloundinaryPostNewsImage(data){
    return 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg'
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
    var tag = this.state.tag;
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

  handleTagChange(event){
    this.setState({tag:event.target.value})
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
      //For Add Thread page
      
      if(this.state.tagdata!==null){
        this.tag=[];
        for(let i=0;i<this.state.tagdata.length;i++){
          this.tag.push(<MenuItem value={this.state.tagdata[i].tag_id}>{this.state.tagdata[i].tag_name}</MenuItem>)
      }
      }
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
          <FormControl style={{width:"100%",paddingBottom:"10px", color:"#ff5722"}} >
              <InputLabel shrink>
                  Tag
              </InputLabel>
              <Select
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                  displayEmpty
                  name="model"
              >
                  <MenuItem value={0}>
                  <em>Choose your tag</em>
                  </MenuItem>
                  {this.tag}
              </Select>
          </FormControl>
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

