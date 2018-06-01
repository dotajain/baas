import React, { Component } from 'react';
// custom Component
import Header from "./partial/Header"
import ShowDetails from "./partial/ShowDetails";
import Dashboard from "./partial/Dashboard";

//images
import analytic_1 from "./images/analytic_1.png";
import analyticPlatform from "./images/analyticPlatform.png";
import microservices from "./images/microservices.png";

class Fedex extends Component {
  constructor(){
    super();
    this._imageOnclick= this._imageOnclick.bind(this);
    this.state = {
      isDashboard: true,
      isDetail: ''
    }
  }

  _imageOnclick(e) {
        this.setState({isDashboard:false, isDetail: e });
  }
  render() { 
    let pageData;      
    if (this.state.isDashboard) {
    pageData = <Dashboard data={imageData} onclick={this._imageOnclick}/>

    } else if (this.state.isDetail) {
    pageData = <ShowDetails data={this.state.isDetail}/>

    } else {
      pageData = "No Data";
    }


    return (
      <div className="fedex">
        <Header />
        {pageData}
      </div>
    );
       }
   }


const imageData=[
        {
            imageName:"Microsoft",
            path:analytic_1,
            info: [
              {
                  atritbute1:"yello"
              },
                {    
                  atritbute1:"green"
                },
                  {  
                    atritbute1:"deve" 
                },

                {
                    atritbute1:"grow"
                }
            ]
                
        },
        {
            imageName:"Oracle",
            path: analyticPlatform,
            info: [
              {
                  atritbute1:"yello1"
              },
                {    
                  atritbute1:"green1"
                },
                  {  
                    atritbute1:"deve1" 
                },

                {
                    atritbute1:"grow1"
                }
            ]
        },
        {
            imageName:"Apple",
            path: microservices,
            info: [
              {
                  atritbute1:"yello2"
              },
                {    
                  atritbute1:"green2"
                },
                  {  
                    atritbute1:"deve2" 
                },

                {
                    atritbute1:"grow2"
                }
            ]
        }
];

export default Fedex;