import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DonutChart from '../mixins/DonutChart';
import {
  Box,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import Axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const OverviewDonut = ({ className, portNames, portData, totalBalance, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        //MAP VALUES OF ALL PORTFOLIOS (automatically %)
        data: portData ? [...portData] : [],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: portNames ? [...portNames] : []
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  if (!portData) {return <div>loading</div>}

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Overall Allocation" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <DonutChart data={data} options={options} height="100%" />
        </Box>
        <Grid display="flex" justifyContent="center" direction='column'mt={2}>
          {portNames ? portNames.map((name, index) => (
            <Box key={name} p={1} textAlign="center">
              <Typography color="textPrimary" variant="body1">
                {name}
              </Typography>
              <Typography variant="h2">
                {(portData[index]/totalBalance*100).toFixed(2)}%
              </Typography>
            </Box>
          )) : 'Loading'}
        </Grid>
      </CardContent>
    </Card>
  );
};

OverviewDonut.propTypes = {
  className: PropTypes.string
};

export default OverviewDonut;