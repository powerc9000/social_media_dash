import React  from "react";
import ReactDOM from "react-dom";
import MediaEvent from "./mediaEvent";
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
var Main = React.createClass({
  getInitialState(){
    return {
      shown:10,
      data: [],
      loading: true,
    }
  },
  componentDidMount(){
    Get(`https://nuvi-challenge.herokuapp.com/activities`).then((res)=>{
      this.setState({data: res, loading:false});
    })
  },
  showMore(e){
    if(this.state.shown < this.state.data.length){
      this.setState({
        shown: Math.min(this.state.shown +20, this.state.data.length)
      })
    }
    e.preventDefault();
  },
  renderLoading(){
    return (
      <div>
        Loading Data
      </div>
    )
  },
  renderMainContent(){
   return (
     <div>
        <div className="events_container">
          {
            this.state.data.slice(0,this.state.shown).map((item, index)=>{
              return (<MediaEvent data={item} key={index}/>)
            })
          }
        </div>
        <div>
          {
            this.state.shown < this.state.data.length ?
            <a href="#" onClick={this.showMore} >Show More</a>
            : <div>End of posts</div>
          }
        </div>
      </div>
   )
  },
  render(){
    return (
      <div>
        {this.state.loading ?
          this.renderLoading():
          this.renderMainContent()
        }
      </div>
    )
  }
});

ReactDOM.render(<Main/>, container);
