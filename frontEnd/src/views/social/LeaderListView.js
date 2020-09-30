import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import url from '../../url';
import Page from 'src/components/Page';
import Leaders from './Leaders';
import LeaderSeed from './LeaderSeed'
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LeaderListView = () => {
  const classes = useStyles();
  // const [leaders] = useState(data);
  const [leaders, setLeaders] = React.useState([]);
  useEffect(() => {
    loadLeaders();
  }, []);
  const loadLeaders = () => {
    axios
      .get(`${url}/users/leaders`)
      .then(res => {
        console.log('Current Leaders', res.data.rv);
        const r = res.data.rv;
        setLeaders(r);
      })
      .catch(err => console.log(err));
  };
  return (
    <Page className={classes.root} title="Leaders">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {/* <Leaders leaders={leaders} /> */}
          <LeaderSeed />
        </Box>
      </Container>
    </Page>
  );
};

export default LeaderListView;
