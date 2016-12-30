import React  from "react";
import ReactDOM from "react-dom";
function Get(url){
  return new Promise((resolve, reject)=>{
    var req = new XMLHttpRequest();
    req.addEventListener("load", (res)=>{
      var status = res.target.status;
      if(status >= 200 && status < 300){
        var result = res.target.response;
        if(req.getResponseHeader("Content-Type").indexOf("application/json") > -1){
          result = JSON.parse(result);
        }
        resolve(result);
      }
      else{
        reject(res);
      }
    });
    req.open("GET", url);
    req.send();
  });
}
var container = document.getElementById("content");
var MediaEvent = React.createClass({
  getInitialState(){
    return {

    }
  },
  render(){
    var data = this.props.data;
    console.log(data);
    return (
      <div className="event">
        <div className="event_header">

          <a href={data.actor_url} className="actor_img"><img src={data.actor_avator} width="50" height="50"/></a>
          <a href={data.actor_url}>{data.actor_username}</a>
        </div>
        <div className="event_body">
          <a href={data.activity_url}>
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
});

var Main = React.createClass({
  getInitialState(){
    return {
      data: []
    }
  },
  componentDidMount(){
    Get(`https://nuvi-challenge.herokuapp.com/activities`).then((res)=>{
      this.setState({data: res});
    })
  },
  render(){
    return (
      <div>
        <div className="events_container">
          {
            this.state.data.slice(0,10).map((item, index)=>{
              return (<MediaEvent data={item} key={index}/>)
            })
          }
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Main/>, container);
