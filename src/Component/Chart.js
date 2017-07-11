import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'left',
    location:'City',
  }

  render(){
    return (
      <div className="chart">
        <Bar
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Token Count:  '+this.props.location,
              fontSize:15
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;
