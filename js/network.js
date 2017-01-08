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

export {Get};