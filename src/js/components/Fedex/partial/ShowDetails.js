import React from "react";
import _ from 'lodash';

// import analytic_1 from "../images/analytic_1.png";
const ImageBody = ({...props }) =>{
  console.log(props.data);
  const imageInfo = _.map(props.data.info, (item, i) => {
    //    let product; 
    return (
      <table cellSpacing="0" key={i}>
        <tbody>
          <tr>
            <td width="30%">{item.atritbute1}</td>
            <td >{item.atritbute1}</td>
          </tr>
          <tr>
            <td>{item.atritbute1}</td>
            <td>{item.atritbute1} </td>
          </tr>
        </tbody>
      </table>
    )
  });

  return (
    <div>
      <div className="jumbotron">
        <form>
          <div className="form-group row">
            <div className="col-sm-6" style={{ border: 'solid', borderColor: 'red' }}>
              <img src={props.data.path} alt="" />
            </div>
            <div className="col-sm-6" style={{ border: 'solid', borderColor: 'green' }}>
              <div>
                <h1>Image Details</h1>
              </div>
              {imageInfo}
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="button" className="btn btn-primary"  >Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}

export default ImageBody;