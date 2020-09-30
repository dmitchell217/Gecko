import React, {useState, useEffect} from 'react';
import { Container, Grid, makeStyles, CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from '../../components/LatestOrders';
import PerformanceSummary from '../../components/PerformanceSummary';
import TodaysChange from '../../components/TodaysChange';
import TotalFollowers from '../../components/TotalFollowers';
import TotalBalance from '../../components/TotalBalance';
import OverviewDonut from '../../components/OverviewDonut';
import TodaysMoney from '../../components/TodaysMoney';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import url from '../../url'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [chartData, setChartData] = useState()
  // Portfolio Values
  const [portNames, setPortNames] = useState();
  const [portData, setPortData] = useState();
  // End
  const [todaysChangeP, setTodaysChangeP] = useState(); // Percentage
  const [todaysChangeV, setTodaysChangeV] = useState(); // Value
  const [totalFollowers, setFollowers] = useState(-1);
  const [totalBalance, setBalance] = useState(-1);

  useEffect(() => {
    loadTodaysChange();
    loadAvailableBalance();
    getFollowerCount();
    loadPortfolioAllocations();
    loadUserPerformanceGraphData()
  }, []);

  const loadUserPerformanceGraphData = () => {
    var currUid = localStorage.getItem('id');
    axios
    .get(`${url}/users/performance-graph/${currUid}'`)
    .then(res => {
        setChartData(res.data.rv)
    })
    .catch(err => console.log(err));
  }

  const loadTodaysChange = () => {
    var currUid = localStorage.getItem('id'); //exemplar call to local storage
    console.log("UID", currUid)
    axios
      .get(`${url}/users/overall-performance/${currUid}`)
      .then(res => {
        console.log("res data", res.data)
        setTodaysChangeP(res.data.percent);
        setTodaysChangeV(res.data.value);
      })
      .catch(err => console.log(err));
  };

  const getFollowerCount = () => {
    var currUid = localStorage.getItem('id'); //exemplar call to local storage
    axios
      .get(`${url}/users/followers/${currUid}`)
      .then(res => {
        setFollowers(res.data);
      })
      .catch(err => console.log(err));
  };

  const loadAvailableBalance = () => {
    var currUid = localStorage.getItem('id');
    axios
      .get(`${url}/users/total-balance/${currUid}`)
      .then(res => {
        setBalance(res.data); // returns at Number that represents a percent.
      })
      .catch(err => console.log(err));
  };

  const loadPortfolioAllocations = () => {
    var currUid = localStorage.getItem('id');
    var pNames = [];
    var pData = [];
    axios
      .get(`${url}/portfolios/portfolio-allocations/${currUid}`)
      .then(res => {
        res.data.forEach(port => {
          pNames.push(port.name);
          pData.push(port.currentValue);
        });
        setPortData(pData);
        setPortNames(pNames);
      })
      .catch(err => console.log(err));
  };


  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Typography variant="h1">FOLLOWER</Typography>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysChange change={todaysChangeP} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFollowers followers={totalFollowers} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysMoney money={todaysChangeV} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBalance balance={totalBalance} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <PerformanceSummary chartData={chartData}/>
          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <OverviewDonut portNames={portNames} portData={portData} totalBalance={totalBalance}/>
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;