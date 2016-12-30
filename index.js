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
  }
  render(){
    var data = this.props.data;
    return (
      <div>
        {data.provider}
      </div>
    );
  }
});

var Main = React.createClass({
  getInitialState(){
    return {
      data: [];
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
        Hello!
        <div>
          {
            this.state.data.map((item)=>{
              return (<MediaEvent data={item} />)
            })
          }
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Main/>, container);
