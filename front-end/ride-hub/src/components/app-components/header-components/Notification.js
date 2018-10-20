import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
import '../../stylesheet/Header.css';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={unread:true,display:false,not_read_noti:0,loaded:false}
        this.handleReadNotification = this.handleReadNotification.bind(this);
        this.dummydata = [{"noti":"@john votes your comment in thread BMW thread...","creation_date":"2018-10-20T09:00:00.000Z","threadid":"1","forumid":null,"userid":4,"has_read":true},{"noti":"@sontungmtp creates new thread How long s... on your followed forum Wave Alpha","creation_date":"2018-10-19T11:08:24.000Z","threadid":"39","forumid":null,"userid":4,"has_read":false},{"noti":"@sontungmtp creates new thread Won't pick... on your followed forum SH 300 ABS","creation_date":"2018-10-19T11:04:33.000Z","threadid":"38","forumid":null,"userid":4,"has_read":false},{"noti":"@tom123 creates new thread Tail light... on your followed forum SH 300 ABS","creation_date":"2018-10-19T10:43:43.000Z","threadid":"36","forumid":null,"userid":4,"has_read":false}]
        this.currentref = window.location.href;
        this.fetchData = this.fetchData.bind(this);
        this.parseDateTime = this.parseDateTime.bind(this);
    }
    
      parseDateTime(timeString){
        let months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
            ];
        let year = Number(timeString.substring(0,4))
        let month = Number(timeString.substring(5,7))
        let date = Number(timeString.substring(8,10))
        let h = Number(timeString.substring(11,13))
        let m = timeString.substring(14,16); 
        let od;
        if(date>3)
            od="th"
        else if(date===3)
            od = "rd"
        else if(date===2)
            od = "nd"
        else if(date===1)
            od = "st"
        let result = h+":"+m+ " "+months[month-1]+" "+date+od+" "+year;
        return result;
      }
  componentDidMount(){
      //API for push button notificiation_read //body 
      this.fetchData()
  }

  fetchData(){
    this.childcontent=[];
    this.setState({loaded:false})
    fetch('https://ride-hub.herokuapp.com/api/user/notification')
      .then(response=>{
          if(!response.ok){
              //User fault
              if(response.status!=403)
                  this.childcontent.push(
                      <div className="child fail">
                              <div className="data">
                                  {'Error: '+response.status}
                              </div>
                                                  
                      </div>
                  )
              else{
                  this.childcontent.push(
                      <div className="child fail">
                              <div className="data">
                                  You must log in to have notification
                              </div>                
                      </div>
                  )
              }
          }else{
              //Correct user
              response.json().then(
                  data=>{
                      let not_read=0;
                      for(var i=0;i<data.length;i++){
                          let link;
                          if(data[i].threadid!=null){
                              link = '/thread/'+data[i].threadid
                          }else if(data[i].forumid!=null){
                              link = '/subforum/'+data[i].forumid
                          }
                          this.childcontent.push(
                              <Noti has_read={data[i].has_read} link={link} noti={data[i].noti} creation_date={this.parseDateTime(data[i].creation_date) } handleReadNotification={this.handleReadNotification}> ></Noti>
                          )
                          if(!data[i].has_read){
                              not_read+=1;
                          }
                          console.log(data[i].has_read)
                      }
                      this.setState({not_read_noti:not_read,loaded:true})
                  }
              )
          }
      })
    //  var data = this.dummydata;
    //  let not_read=0;
    //  for(var i=0;i<data.length;i++){
    //      let link;
    //      if(data[i].threadid!=null){
    //          link = '/thread/'+data[i].threadid
    //      }else if(data[i].forumid!=null){
    //          link = '/subforum/'+data[i].forumid
    //      }
    //      this.childcontent.push(
    //          <Noti has_read={data[i].has_read} link={link} noti={data[i].noti} creation_date={this.parseDateTime(data[i].creation_date) } handleReadNotification={this.handleReadNotification}> ></Noti>
    //      )
    //      if(!data[i].has_read){
    //          not_read+=1;
    //      }
    //      console.log(data[i].has_read)
    //  }
    //  this.setState({not_read_noti:not_read,loaded:true})
  }

  componentDidUpdate(){
    let newref = window.location.href;
    if (this.currentref!=newref){
        this.currentref = newref
        this.fetchData();
    }
    if(this.state.not_read_noti<=0&&this.state.loaded){
        if(this.state.unread){
            this.setState({unread:false})
        }
    }
  }
  handleReadNotification(){
    let current = this.state.not_read_noti;
    current-=1;
    this.setState({not_read_noti:current})
  }

  render() {

    return (
        <div className="btn-group">
            <button type="button" className={"btn btn-link dropdown-toggle "+this.state.unread} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleReadNotification}>
                <i className="fas fa-bell"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                {this.childcontent}
            </div>
        </div>
    );
  }
}

export default Notification;

class Noti extends Component{
    constructor(props){
        super(props);
        this.state={has_read:true}
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick = ()=>{
        
        if(!this.state.has_read){
            this.setState({has_read:true});
            this.props.handleReadNotification();
        }
        
       
    }

    componentDidMount(){
        this.setState({has_read:this.props.has_read})
    }

    render(){
        var classname = "child "+this.state.has_read;
        return (
            <div className={classname}>
                <ReactLink to={this.props.link} onClick={this.handleClick}>
                    <div className="data" onClick={this.handleClick}>
                        {this.props.noti}
                    </div>
                    <div className="time">
                        {this.props.creation_date}
                    </div>
                </ReactLink>                           
            </div>
        );
    }
}