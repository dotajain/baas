import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts';

import { connect } from "react-redux";
import { getTemprature, getAllTemprature } from "../../../redux/actions/iotAction";

@connect((store) => {
  return {
    data: store
  };
})

class DeviceRegistration extends Component {

  componentDidMount() {
    this.props.dispatch(getAllTemprature());
  }

  render() {
    const { data } = this.props;
    
    let highChart;
    let sortedData;
    let seriesData = [];
    let updatedData = '';

    if (data.getTemprature.all) {
      
      sortedData = _.orderBy(data.getTemprature.all, ['dateCreated'], ['asc']);
      _.map(sortedData, (item, i) => {
        if (i > sortedData.length - 10 && i < sortedData.length - 5 ) {
          const temparature = Number(item.temparature.toFixed(2));
          
          const year = new Date(item.dateCreated).getFullYear(); 
          const month = new Date(item.dateCreated).getMonth(); 
          const day = new Date(item.dateCreated).getDate(); 
          const hours = new Date(item.dateCreated).getHours(); 
          const minutes = new Date(item.dateCreated).getMinutes(); 
          const seconds = new Date(item.dateCreated).getSeconds();
          const millisec = new Date(item.dateCreated).getMilliseconds();
          
          const utcTime = Date.UTC(year, month, day, hours, minutes, seconds, millisec);
          let series;
          if (item.isIntimate === 1) {
            const obj = {
            	x: utcTime,
              y: temparature,
              marker: {
                  symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
              }
            }
            series = obj;
          } else {
            series = [utcTime, temparature];
          }
          seriesData.push(series);
        };
      });

      

      let config = {
        chart: {
          type: 'spline',
          events: {
                load: function () {

                    // set up the updating of the chart each second
                    let series = this.series[0];
                    let count = sortedData.length - 5;
                    setInterval(function () {
                      let item = sortedData[count - 1];
                      let year, month, day, hours, minutes, seconds, millisec, seriess, utcTime;
                      let tempDate;
                      let temparature = Number(item.temparature.toFixed(2));
                      // fetching data
                      axios.get('https://gettemperatureservice.cfapps.io/getLatest')
                      .then(function (response) {
                        updatedData = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });


                      if (count === sortedData.length) {
                        if (updatedData.dateCreated === item.dateCreated) {
                          tempDate = new Date();
                        } else {
                          console.log('getupdated Data');
                          tempDate = updatedData.dateCreated;
                          temparature = Number(updatedData.temparature.toFixed(2));
                        }
                      } else {
                        tempDate = item.dateCreated;
                        count++;
                      }

                      year = new Date(tempDate).getFullYear(); 
                      month = new Date(tempDate).getMonth(); 
                      day = new Date(tempDate).getDate(); 
                      hours = new Date(tempDate).getHours(); 
                      minutes = new Date(tempDate).getMinutes(); 
                      seconds = new Date(tempDate).getSeconds();
                      millisec = new Date(tempDate).getMilliseconds();
                      
                      utcTime = Date.UTC(year, month, day, hours, minutes, seconds, millisec);
                      if (item.isIntimate === 1) {
                        const obj = {
                          x: utcTime,
                          y: temparature,
                          marker: {
                              symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                          }
                        }
                        seriess = obj;
                      } else {
                        seriess = [utcTime, temparature];
                      }
                      series.addPoint(seriess, true, true);

                      

                    }, 4000);
                }
            }
        },
        title: {
            text: 'Live temperature recognize service'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)'
          },
          plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    ReactHighcharts.Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    ReactHighcharts.Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
          spline: {
            dataLabels: {
              enabled: true
            },
            marker: {
              enabled: true
            }
          }
        },
        series: [{
          name: 'Temprature view',
          data: seriesData 
        }]
      }
      highChart = <ReactHighcharts config={config} />;
    } else {
      highChart = (
        <div className="page-loader text-center">
          <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
      )
    }
    
    return (
      <div>
        <div className="container">
          
          <section className="text-center">
            <h1 className="page-title">Event Processing from Devices</h1>
            <p>Recognize Live Temprature</p>
          </section>

          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              {highChart}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default DeviceRegistration;