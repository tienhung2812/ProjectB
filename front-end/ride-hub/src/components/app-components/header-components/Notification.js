import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
import '../../stylesheet/Header.css';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={unread:true,display:false}
        this.handleReadNotification = this.handleReadNotification.bind(this);
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
                        for(var i;i<data.length;i++){
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
        // this.childcontent.push(
        //     <div className="child true">
        //         <ReactLink to={'/'}>
        //             <div className="data">
        //                 @john creates new thread sefse... on your followed forum SH Mode
        //             </div>
        //             <div className="time">
        //                 {this.parseDateTime('2018-10-13T00:00:00.000Z')}
        //             </div>
        //         </ReactLink>                           
        //     </div>
        // )
        // this.childcontent.push(
        //     <div className="child false">
        //         <ReactLink to={'/'}>
        //             <div className="data">
        //                 @john creates new thread sefse... on your followed forum SH Mode
        //             </div>
        //             <div className="time">
        //                 {this.parseDateTime('2018-10-13T00:00:00.000Z')}
        //             </div>
        //         </ReactLink>                           
        //     </div>
        // )
      
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
