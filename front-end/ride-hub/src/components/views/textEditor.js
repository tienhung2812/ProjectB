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
  }
}

