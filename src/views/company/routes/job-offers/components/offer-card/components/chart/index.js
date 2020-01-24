import React, { Component } from 'react';
import Box from '@common/box';
import { Doughnut } from 'react-chartjs-2';
import theme from 'theme';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        cutoutPercentage: 70,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Status',
          position: 'top',
          fontSize: 16,
          fontFamily: 'Helvetica'
        }
      },
      data: {
        labels: ['Hired', 'Interviewed', 'Requested', 'Needed'],
        datasets: [
          {
            data: [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10],
            backgroundColor: [
              theme.colors.primary,
              theme.colors.secondary,
              theme.colors.info,
              theme.colors.success
            ],
            hoverBackgroundColor: [
              theme.colors.primary,
              theme.colors.secondary,
              theme.colors.info,
              theme.colors.success
            ],
            hoverBorderColor: [
              theme.colors.primary,
              theme.colors.secondary,
              theme.colors.info,
              theme.colors.success
            ],
            hoverBorderWidth: [2, 2, 2]
          }
        ]
      }
    };
  }

  render() {
    const { options, data } = this.state;
    return (
      <Box height="100%" p={20}>
        <Doughnut width={100} options={options} data={data} />
      </Box>
    );
  }
}

export default Chart;
