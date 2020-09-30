import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Leaders from './Leaders';
import Toolbar from './Toolbar';
import data from './data';
import LeaderCard from '../automation/LeaderCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
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


const FollowerSocialView = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  let leaders = [
    { name: 'Mr. Trades', chg: 14.23 },
    { name: 'Rashad', chg: 24.85 },
    { name: 'David', chg: -4.2 },
    { name: 'Nathan', chg: 13.34 },
    { name: 'Carrie', chg: -10.45 },
    { name: 'Allie', chg: 1.03 },
    { name: 'Clint', chg: 2.34 },
    { name: 'Adnan', chg: -12.45 },
    { name: 'Dana', chg: 0.04 },
    { name: 'Kevin', chg: -2.41 }
  ];
  let data = [
    [1, 34],
    [3.8, 43],
    [5, 31],
    [10, 43],
    [13, 33],
    [15, 43],
    [18, 33],
    [20, 52]
  ];
    // const [leaders, setLeaders] = React.useState([]);
    // const [data, setData] = React.useState([]);
    useEffect(() => {
      loadData();
      loadLeaders();
    }, []);
    const loadData = () => {
      axios
        .get(`${url}/users/follower/leaders/data`)
        .then(res => {
          console.log('FollowerView Leaders data', res.data.rv);
          const rv = res.data.rv;
          // setData(rv);
        })
        .catch(err => console.log(err));
    };
    const loadLeaders = () => {
      axios
        .get(`${url}/users/follower/leaders`)
        .then(res => {
          console.log('FollowerView Leaders', res.data.rv);
          const r = res.data.rv;
          // setLeaders(r);
        })
        .catch(err => console.log(err));
    };
  return (
    <Page className={classes.root} title="Leaders">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={1}>
            {leaders.map((leader, idx) => (
              <LeaderCard name={leader.name} chg={leader.chg} data = {data[idx]} />
            ))}
          </Grid>
          <Pagination
            component="div"
            count={leaders.length}
            variant="outlined"
            color="primary"
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default FollowerSocialView;
