import React  from "react";
import ReactDOM from "react-dom";
var container = document.getElementById("content");

var Main = React.createClass({
  render(){
    return (
      <div>
        Hello!
      </div>
    )
  }
});

ReactDOM.render(<Main/>, container);
