import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AreaChart from '../../mixins/AreaChart';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: 200,
    minWidth: '30%',
    paddingBottom: theme.spacing(3),
    margin:7
  }
}));

export default function LeaderCard({ name, chg, data, ...rest }) {
  const classes = useStyles();
  const series = [
    {
      name: "Overall Performance",
      data: data
    }
  ];
  let options = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      opacity: 0.5,
      color: '#0A6D03'
    },
    yaxis: {
      min: 0
    },
    colors: ['#0A6D03'],
    title: {
      text: `${name}`,
      offsetX: 0,
      style: {
        fontSize: '24px'
      }
    },
    subtitle: {
      text: `${chg}%`,
      offsetX: 0,
      style: {
        fontSize: '14px'
      }
    }
  };

  return (
    <Card className={clsx(classes.root)} {...rest}>
      <CardContent>
        <AreaChart series={series} options={options} />
      </CardContent>
    </Card>
  );
}

LeaderCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};
