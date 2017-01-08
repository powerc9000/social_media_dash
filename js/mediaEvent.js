import React from "react";

class MediaEvent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var data = this.props.data;
    console.log(data);
    return (
      <div className="event">
        <div className="event_header">
          <div className="actor_details">
            <a href={data.actor_url} className="actor_img" target="_blank"><img src={data.actor_avator} width="50" height="50"/></a>
            <a href={data.actor_url} target="_blank">{data.actor_username}</a>
          </div>
          <div className="event_date">
            {(new Date(data.activity_date)).toLocaleDateString()}
          </div>
        </div>
        <div className="event_body">
          <a href={data.activity_url} target="_blank">
          <div>
          {
            data.activity_attachment ?
            <img src={data.activity_attachment} />:null
          }
          </div>
          {data.activity_message}
          </a>
        </div>
        {data.provider}
      </div>
    );
  }
}

export default MediaEvent;
