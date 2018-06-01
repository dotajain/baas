import React from "react";
 
const Dashboard = ({...props}) =>{

    const listImages = _.map(props.data , (item, i) => {

        return (
          <div  className="col-sm-4" style={{ border:'solid',borderColor: 'blue'}} key={i}>
          <img src={item.path} alt="no image" onClick={() => props.onclick(item) }/>   
          </div>    
             );
      });

return (
    <div className="jumbotron">
       <div className="form-group row">
                   {listImages}           
        </div>
    </div>
      )
}

export default Dashboard;