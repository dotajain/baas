import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';

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
    this.interval = setInterval(this.props.dispatch(getTemprature()), 10000);
    this.props.dispatch(getAllTemprature());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    const { data } = this.props;
    let highchartConfig;
    let highChart;    
    let seriesData = [];

    if (data.getTemprature.all) {
      const sortedData = _.orderBy(data.getTemprature.all, ['dateCreated'], ['asc']);
      _.map(sortedData, (item, i) => {
        if (i > sortedData.length - 10) {
          let temparature = Number(item.temparature.toFixed(2));
          // let items = temparature
          if (item.isIntimate > 0) {
            const obj = {
                  y: temparature,
                  marker: {
                      symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                  }
              }
              seriesData.push(obj);
          } else {
            seriesData.push(temparature);
          }
          
          
        }
      });
    }

    
    if (data.getTemprature.success) {
      highchartConfig = {
        chart: {
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Number(data.getTemprature.success.temparature.toFixed(2));
                        series.addPoint([x, y], true, true);
                    }, 10000);
                }
            }
        },
        title: {
            text: 'Live temprature service'
        },
        xAxis: {
            type: 'datetime',
            labels: {
              format: '{value: %H:%M}'
            }
        },
        yAxis: [{
            labels: {
                format: '{value} °C'
            },
            title: {
                text: 'Temperature (°C)'
            }
        }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Temperature',
            data: seriesData,
            pointStart: (new Date()).getTime()
        }]
      };
      highChart = <ReactHighcharts config={highchartConfig} />
    }
    return (
      <div>
        <h1>Device Registration</h1>
        <p>Recognize Live Temprature</p>
        {highChart}
      </div>
    );
  }
}

export default DeviceRegistration;