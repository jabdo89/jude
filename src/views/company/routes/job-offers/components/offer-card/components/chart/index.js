import React, { Component } from 'react';
import Box from '@common/box';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import theme from 'theme';

class Chart extends Component {
  constructor(props) {
    super(props);
    const { offerData } = this.props;
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
            data: [offerData.hired, offerData.interviewed, offerData.requested, offerData.needed],
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
Chart.defaultProps = {
  offerData: undefined
};

Chart.propTypes = {
  offerData: PropTypes.object
};
export default Chart;
