import React from "react";
import _ from 'lodash';

const Dashboard = ({...props }) =>{

  const listImages = _.map(props.data, (item, i) => {

    return (
      <div className="col-sm-4" style={{ border: 'solid', borderColor: 'blue' }} key={i}>
        <img src={item.path} alt="no" onClick={() => props.onclick(item)} />
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