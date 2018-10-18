import React, { Component } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import headimg from '../../../filtersearch-bg.jpg';
import Loader from '../Loader';

const styles = theme => ({
    button: {
      display: 'block',
      marginTop: theme.spacing.unit * 2,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });

export default class FilterSearch extends Component {
  constructor(props){
    super(props);
    this.state = {disable:true,open:false,brand:-1,model:-1,year:-1,issue:-1,tagdata:null,bikedata:null,searchData:null}
    //Props url
    this.handleChange = this.handleChange.bind(this);
   
  }
  componentDidMount() {
    this.brand=[];
    this.model=[];
    this.year = [];
    this.issues = [];



    fetch('https://ride-hub.herokuapp.com/api/thread/filter_data')
    .then(response => {
        if(response.status===200){
            response.json().then(data => {
                //Content
                data=data[0];
                this.setState({
                    tagdata:data.tags,
                    bikedata:data.brands
                })
            });
        }
    })

  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.name=="brand"){
        this.model=[]
        this.year = []
        this.setState({model:-1,year:-1})
        if(event.target.value>=0){
            for(let i=0;i<this.state.bikedata[event.target.value].models.length;i++){
                this.model.push(<MenuItem value={i}>{this.state.bikedata[event.target.value].models[i]}</MenuItem>)
            }
            
        }
    }
    //Searchdata
    let brandname=null;
    let modelname=null;
    let issuename = null;

    //Filter data
    if(this.state.brand>-1){
        brandname=this.state.bikedata[this.state.brand].brand_name;
    }
    if(this.state.model>-1){
        modelname = this.state.bikedata[this.state.brand].models[this.state.model]
    }
    if(this.state.issue>-1){
        for(let i=0;i<this.state.tagdata.length;i++){
            if(this.state.tagdata[i].tag_id===this.state.issue){
                issuename = this.state.tagdata[i].tag_name;
                break;
            }
        }
    }
    if(event.target.name=="brand"){
        if(event.target.value!=null){
            if(event.target.value>-1){
                brandname=this.state.bikedata[event.target.value].brand_name;
            }else{
                brandname=null
            }
        }           
    }
    if(event.target.name=="model"){
        if(event.target.value!=null){
            if(event.target.value>-1){
                modelname = this.state.bikedata[this.state.brand].models[event.target.value]
            }else{
                modelname=null
            }
        }   
    }
    if(event.target.name=="issue"){
        if(event.target.value!=null){
            if(event.target.value>=0){
                for(let i=0;i<this.state.tagdata.length;i++){
                    if(this.state.tagdata[i].tag_id===event.target.value){
                        issuename = this.state.tagdata[i].tag_name;
                        break;
                    }
                }
            }else{
                issuename=null
            }
        }
        
    }

    //Push data to search data
    let searchFilterString='{';
    if(brandname!=null){
        searchFilterString+='"brand":"'+brandname+'"'
    }
    if(modelname!=null){
        if(searchFilterString.length>2){
            searchFilterString+=",";
        }
        searchFilterString+='"model":"'+modelname+'"'
    }
    if(issuename!=null){
        if(searchFilterString.length>2){
            searchFilterString+=",";
        }
        searchFilterString+='"issue":"'+issuename+'"'
    }
    searchFilterString+="}";
    if(searchFilterString.length>2){
        this.setState({disable:false})
    }else{
        this.setState({disable:true})
    }
    this.setState({searchData:JSON.parse(searchFilterString)});

  }

  handleFilterSearch = ()=>{
    this.props.history.push({
        pathname: '/filterSearch',
        searchData:this.state.searchData
      })
  }
  render() {
    if(this.content===null){
        this.content= <Loader/>
    }

    if(this.state.tagdata!==null){
        this.issues=[]
        for(let i=0;i<this.state.tagdata.length;i++){
            this.issues.push(<MenuItem value={this.state.tagdata[i].tag_id}>{this.state.tagdata[i].tag_name}</MenuItem>)
        }
    }
    if(this.state.bikedata!==null){
        this.brand=[]
        for(let i=0;i<this.state.bikedata.length;i++){
            this.brand.push(<MenuItem value={i}>{this.state.bikedata[i].brand_name}</MenuItem>)
        }
    }

    return(
    <div className="filtersearch wrapper">
        <div className="head-img">
            <img src={headimg} alt="headimg"></img>
        </div>
        <div className="content-wrapper">
            <div className="title">
                Filter
            </div>
            <div className="content">
                <form autoComplete="off">
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                        <InputLabel shrink>
                            Brand
                        </InputLabel>
                        <Select
                            value={this.state.brand}
                            onChange={this.handleChange}
                            displayEmpty
                            name="brand"
                        >
                            <MenuItem value={-1}>
                            <em>Choose your brand</em>
                            </MenuItem>
                            {this.brand}
                        </Select>
                    </FormControl>
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                        <InputLabel shrink>
                            Model
                        </InputLabel>
                        <Select
                            value={this.state.model}
                            onChange={this.handleChange}
                            displayEmpty
                            name="model"
                        >
                            <MenuItem value={-1}>
                            <em>Choose your model</em>
                            </MenuItem>
                            {this.model}
                        </Select>
                    </FormControl>
                    {/* <FormControl style={{width:"35%",marginLeft:"5px"}}>
                        <InputLabel shrink>
                            Year
                        </InputLabel>
                        <Select
                            value={this.state.year}
                            onChange={this.handleChange}
                            displayEmpty
                            name="year"
                        >
                            <MenuItem value={-1}>
                            <em>Choose your year</em>
                            </MenuItem>
                            {this.year}
                        </Select>
                    </FormControl> */}
                    <FormControl style={{width:"100%"}}>
                        <InputLabel shrink>
                            Issue
                        </InputLabel>
                        <Select
                            value={this.state.issue}
                            onChange={this.handleChange}
                            displayEmpty
                            name="issue"
                        >
                            <MenuItem value={-1}>
                            <em>What is your issue?</em>
                            </MenuItem>
                            {this.issues}
                        </Select>
                    </FormControl>
                    <Button variant="contained"  className="searchbtn" disabled={this.state.disable}>
                        <ReactLink to={ '/filterSearch/'+JSON.stringify(this.state.searchData)}>
                            SEARCH
                        </ReactLink>
                    </Button>
                </form>
            </div>
        </div>
    </div>
    );
      
  }
}

