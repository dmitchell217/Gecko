import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Container, Grid, makeStyles, CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from '../../components/LatestOrders';
import PerformanceSummary from '../../components/PerformanceSummary';
import TodaysChange from '../../components/TodaysChange';
import TotalFollowers from '../../components/TotalFollowers';
import TotalBalance from '../../components/TotalBalance';
import OverviewDonut from '../../components/OverviewDonut';
import FollowBar from '../../components/FollowBar';
import TodaysMoney from '../../components/TodaysMoney'
import PortfolioDropdown from '../automation/elements/PortfolioDropdown';
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

  // Portfolio Values
  const [portNames, setPortNames] = useState()
  const [portData, setPortData] = useState()
  // End
  const [todaysChangeP, setTodaysChangeP] = useState() // Percentage
  const [todaysChangeV, setTodaysChangeV] = useState() // Value
  const [totalFollowers, setFollowers] = useState(-1)
  const [totalBalance, setBalance] = useState(-1)
  const [chartData, setChartData] = useState()
  const [chart, setChart] = useState()
  const [names, setNames] = useState()
  const [values, setValues] = useState()
  const [balance, setTotalBalance] = useState()

  const portfolio = localStorage.getItem("onPortfolio")

  useEffect(() => {
   loadTodaysChange()
    loadAvailableBalance()
    getFollowerCount()
    loadPortfolioAllocations()
    loadUserPerformanceGraphData()
    if (portfolio && portfolio != "Dashboard") {getSpecificPortfolioHistory(portfolio)}
    if (portfolio && portfolio != "Dashboard") {loadPortfolio(portfolio)}
    // loadAllPortfolioPerformances()
  }, []);

  const getID = () => localStorage.getItem("id")

  // const loadAllPortfolioPerformances = () => {
  //   axios
  //   .get(`${url}/portfolios/allHistory/${getID()}`)
  //   .then(res => {
  //       console.log(res.data.rv)
  //       setCharts(res.data.rv)
  //   })
  //   .catch(err => console.log(err));
  // }

  const loadUserPerformanceGraphData = () => {
    var currUid = localStorage.getItem("id") //exemplar call to local storage
    axios
    .get(`${url}/users/performance-graph/${currUid}`)
    .then(res => {
        setChartData(res.data.rv)
    })
    .catch(err => console.log(err));
  }

  const loadTodaysChange = () => {
    var currUid = localStorage.getItem("id") //exemplar call to local storage
    axios.get(`${url}/users/overall-performance/${currUid}?days=2`)
    .then(res => {
        // setTodaysChangeP(res.data.percent)
        setTodaysChangeP(res.data.percent/100)
        setTodaysChangeV(res.data.value)
    })
    .catch(err => console.log(err));
  }

  const getFollowerCount = () => {
    var currUid = localStorage.getItem("id") //exemplar call to local storage
    axios.get(`${url}/users/followers/${currUid}`)
    .then(res => {
      setFollowers(res.data.rv)
    })
    .catch(err => console.log(err));
  }

  const loadAvailableBalance = () => {
    var currUid = localStorage.getItem("id")
    axios.get(`${url}/users/total-balance/${currUid}`)
    .then(res => {
      setBalance(res.data.rv) // returns at Number that represents a percent.
    })
    .catch(err => console.log(err));
  }

  const loadPortfolioAllocations = () => {
    var currUid = localStorage.getItem("id")
    var pNames = []; var pData = [];
    axios.get(`${url}/portfolios/portfolio-allocations/${currUid}`)
    .then(res => {
      let allPorts = res.data.rv
      for (let i = 0; i<allPorts.length; i++) {
          pNames.push(allPorts[i].name)
          pData.push(allPorts[i].currentValue.toFixed(2))
      };
      pNames.push("unAllocated")
      pData.push(res.data.unAllocated.toFixed(2))
      // push the unallocated value with name unallocated
        setPortData(pData)
        setPortNames(pNames)
    })
    .catch(err => console.log(err));
  }

  const getSpecificPortfolioHistory = (portId) => {
    var currUid = localStorage.getItem("id")
    axios.get(`${url}/portfolios/history/${portId}?days=20`)
    .then(res => {
        setChart(res.data.rv)
    })
    .catch(err => console.log(err));
  }


  //5f64f5c4d47886242c72ea6c
  const loadPortfolio = (portId) => {
    axios.get(`${url}/portfolios/chart/${portId}`)
    .then(res => {
        setNames(res.data.names)
        setValues(res.data.values)
        setTotalBalance(res.data.totalBalance)
    })
    .catch(err => console.log(err));
  }

  let sendChart = localStorage.getItem("onPortfolio") == "Dashboard" || !localStorage.getItem("onPortfolio") ? chartData : chart
  let sendNames = localStorage.getItem("onPortfolio") == "Dashboard" || !localStorage.getItem("onPortfolio") ? portNames : names
  let sendData = localStorage.getItem("onPortfolio") == "Dashboard" || !localStorage.getItem("onPortfolio") ? portData : values
  let sendBalance = localStorage.getItem("onPortfolio") == "Dashboard" || !localStorage.getItem("onPortfolio") ? totalBalance : balance
console.log(todaysChangeP)
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysChange change={(-todaysChangeP).toFixed(2)} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFollowers followers={totalFollowers} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysMoney money={-todaysChangeV} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBalance balance={totalBalance} />
          </Grid>
          <Grid item lg={5} sm={6} xl={3} xs={12}>
            <PortfolioDropdown portNames={portNames} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <PerformanceSummary chartData={sendChart} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <OverviewDonut portNames={sendNames} portData={sendData} totalBalance={sendBalance} />
          </Grid>
          {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <CardHeader title="Followers Gained/Lost" />
            <FollowBar />
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