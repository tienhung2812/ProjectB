import React, { Component } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 
import './view-stylesheet/textEditor.css';


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
    this.placeholder = 'Write a comment ...';
  }

  handlePost(){
    var text = this.textInput.current.getEditor().getContents();
    this.textInput.current.getEditor().setContents([{ insert: '\n' }]);;
    console.log(text);
  }

  render() {
    if(this.props.type==='comment'){ 
      return (
        <div className={this.props.type}>
            <ReactQuill 
                theme="snow"
                modules={this.modules}
                formats={this.formats} 
                placeholder={this.placeholder}
                ref={this.textInput}
            />
            <div className="btn-wrapper">
            <button type="button" className="btn btn-link" onClick={this.handlePost}>Post</button>
            </div>
            <div className="end-line">
            </div>
        </div>
      );
    }else{
      return (
        <div className={this.props.type} >
          <form class="bg-light p-3 rounded">        
            <div class="form-group">          
              <input class="form-control" placeholder="Title"/>
            </div>
            <div class="form-group bg-white">
              <ReactQuill 
                theme="snow"
                modules={this.modules}
                formats={this.formats} 
                placeholder={'Text (optional)'}
                ref={this.textInput}
              />
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group form-check form-check-inline">          
                  <input class="form-control mr-2" placeholder="#Tag"/>
                  <button type="submit" class="btn btn-primary">Add Tag(s)</button>
                </div>            
              </div>
              <div class="col">
                  <button type="submit" class="btn btn-primary float-right">POST</button>        
              </div>
            </div>          
        </form>
      </div>
      );
    }
  }
}

