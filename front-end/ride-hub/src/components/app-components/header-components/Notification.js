import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
import '../../stylesheet/Header.css';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={unread:true,display:false}
        this.handleReadNotification = this.handleReadNotification.bind(this);
        this.dummydata = [{"noti":"@john votes your comment in thread BMW thread...","creation_date":"2018-10-20T09:00:00.000Z","threadid":"1","forumid":null,"userid":4,"has_read":true},{"noti":"@sontungmtp creates new thread How long s... on your followed forum Wave Alpha","creation_date":"2018-10-19T11:08:24.000Z","threadid":"39","forumid":null,"userid":4,"has_read":false},{"noti":"@sontungmtp creates new thread Won't pick... on your followed forum SH 300 ABS","creation_date":"2018-10-19T11:04:33.000Z","threadid":"38","forumid":null,"userid":4,"has_read":false},{"noti":"@tom123 creates new thread Tail light... on your followed forum SH 300 ABS","creation_date":"2018-10-19T10:43:43.000Z","threadid":"36","forumid":null,"userid":4,"has_read":false},{"noti":"@john creates new thread vision... on your followed forum Wave Alpha","creation_date":"2018-10-18T21:46:11.000Z","threadid":"31","forumid":null,"userid":4,"has_read":false},{"noti":"@ridehub creates new thread Battery... on your followed forum Wave Alpha","creation_date":"2018-10-18T09:06:47.000Z","threadid":"28","forumid":null,"userid":4,"has_read":false},{"noti":"@ablacuta creates new thread Test Tag... on your followed forum Wave Alpha","creation_date":"2018-10-18T00:46:26.000Z","threadid":"27","forumid":null,"userid":4,"has_read":false},{"noti":"@ablacuta creates new thread How about ... on your followed forum Wave Alpha","creation_date":"2018-10-17T23:47:57.000Z","threadid":"26","forumid":null,"userid":4,"has_read":false},{"noti":"@ablacuta comments on your post in ROLL ROYCE...","creation_date":"2018-10-17T22:23:03.000Z","threadid":"10","forumid":null,"userid":4,"has_read":false},{"noti":"@vintama comments on your post in BMW thread...","creation_date":"2018-10-17T16:04:33.000Z","threadid":"1","forumid":null,"userid":4,"has_read":false},{"noti":"@john creates new thread asas ... on your followed forum SH Mode","creation_date":"2018-10-17T15:22:03.000Z","threadid":"25","forumid":null,"userid":4,"has_read":false},{"noti":"@john creates new thread ădawd... on your followed forum SH Mode","creation_date":"2018-10-17T15:06:32.000Z","threadid":"24","forumid":null,"userid":4,"has_read":false},{"noti":"@admin creates new subforum Winner 150 on your followed forum Honda","creation_date":"2018-10-17T13:00:00.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false},{"noti":"@admin creates new subforum Future 125 FI on your followed forum Honda","creation_date":"2018-10-17T12:00:00.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false},{"noti":"@admin creates new subforum Wave 110 RSX FI on your followed forum Honda","creation_date":"2018-10-17T11:00:00.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false},{"noti":"@admin creates new subforum Wave Alpha on your followed forum Honda","creation_date":"2018-10-17T10:00:00.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false},{"noti":"@john comments on your post in BMW thread...","creation_date":"2018-10-16T00:00:00.000Z","threadid":"1","forumid":null,"userid":4,"has_read":false},{"noti":"@john creates new thread sefse... on your followed forum SH Mode","creation_date":"2018-10-10T00:00:00.000Z","threadid":"21","forumid":null,"userid":4,"has_read":false},{"noti":"@john creates new thread sefse... on your followed forum SH Mode","creation_date":"2018-10-13T00:00:00.000Z","threadid":"22","forumid":null,"userid":4,"has_read":false},{"noti":"@john creates new thread sefse... on your followed forum SH Mode","creation_date":"2018-10-13T23:31:00.000Z","threadid":"23","forumid":null,"userid":4,"has_read":false},{"noti":"@admin comments on your post in BMW thread...","creation_date":"2018-10-07T15:46:01.000Z","threadid":"1","forumid":null,"userid":4,"has_read":false},{"noti":"@admin votes your post in thread BMW thread...","creation_date":"2018-10-07T15:46:00.000Z","threadid":"1","forumid":null,"userid":4,"has_read":false},{"noti":"@john votes your post in thread BMW thread...","creation_date":"2018-10-07T15:46:00.000Z","threadid":"1","forumid":null,"userid":4,"has_read":false},{"noti":"@admin creates new subforum SH 300 ABS on your followed forum Honda","creation_date":"2018-10-07T15:11:28.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false},{"noti":"@admin creates new subforum SH 125i CBS on your followed forum Honda","creation_date":"2018-10-07T15:11:27.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false},{"noti":"@admin creates new subforum SH Mode on your followed forum Honda","creation_date":"2018-10-07T15:11:26.000Z","threadid":null,"forumid":"2","userid":4,"has_read":false}]
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
        console.log(timeString)
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
      this.childcontent=[];
      fetch('https://ride-hub.herokuapp.com/api/user/notification')
        .then(response=>{
            if(!response.ok){
                //User fault
                if(response.status!=403)
                    this.childcontent.push(
                        <div className="child true">
                                <div className="data">
                                    {'Error: '+response.status}
                                </div>
                                                    
                        </div>
                    )
                else{
                    this.childcontent.push(
                        <div className="child true">
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
                        for(var i=0;i<data.length;i++){
                            let link;
                            if(data[i].threadid!=null){
                                link = '/thread/'+data[i].threadid
                            }else if(data[i].forumid!=null){
                                link = '/subforum/'+data[i].forumid
                            }
                            this.childcontent.push(
                                <div className={"child "+data[i].has_read}>
                                    <ReactLink to={link}>
                                        <div className="data">
                                            {data[i].noti}
                                        </div>
                                        <div className="time">
                                            {this.parseDateTime(data[i].creation_date)}
                                        </div>
                                    </ReactLink>                           
                                </div>
                            )
                        }
                    }
                )
            }
        })
        // var data = this.dummydata;
        // for(let i = 0;i<data.length;i++){
        //     let link;
        //     if(data[i].threadid!=null){
        //         link = '/thread/'+data[i].threadid
        //     }else if(data[i].forumid!=null){
        //         link = '/subforum/'+data[i].forumid
        //     }
        //     this.childcontent.push(
        //         <div className={"child "+data[i].has_read}>
        //             <ReactLink to={link}>
        //                 <div className="data">
        //                     {data[i].noti}
        //                 </div>
        //                 <div className="time">
        //                     {this.parseDateTime(data[i].creation_date)}
        //                 </div>
        //             </ReactLink>                           
        //         </div>
        //     )
        // }
  }

  handleReadNotification(){
    if(this.state.unread){
        this.setState({unread:false})
    }
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
