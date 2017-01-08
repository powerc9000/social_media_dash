import React from "react";
import MediaEvent from "./mediaEvent";
import {Get} from "./network";
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shown: 10,
      data: [],
      loading: true
    }
  }

  componentDidMount(){
    Get(`https://nuvi-challenge.herokuapp.com/activities`).then((res)=>{
      this.setState({data: res, loading:false});
    })
  }

  showMore(e){
    if(this.state.shown < this.state.data.length){
      this.setState({
        shown: Math.min(this.state.shown +20, this.state.data.length)
      })
    }
    e.preventDefault();
  }

  renderLoading(){
    return (
      <div>
        Loading Data
      </div>
    )
  }

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
  }

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
}

export default Main;
