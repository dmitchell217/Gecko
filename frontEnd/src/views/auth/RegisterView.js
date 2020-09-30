import React, {useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import url from '../../url'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [confirmPass, setConfirmPassword] = useState("")
  const [funds, setFunds] = useState('')
  const [leader, setLeader] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = (event) => {
    axios.get(`${url}/users/addUser/${name}/${email}/${password}/${leader}/${funds}`)
    .then(res => {
      console.log("New user", res.data.rv)
    })
    .catch(err => console.log(err));
  }

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Create new account
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Use your email to create new account
            </Typography>
          </Box>
            <TextField
              variant="standard"
              placeholder="Name"
              margin="normal"
              fullWidth = "true"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              variant="standard"
              placeholder="Email Address"
              margin="normal"
              fullWidth = "true"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              variant="standard"
              placeholder="Enter your Password"
              margin="normal"
              fullWidth = "true"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              variant="standard"
              placeholder="How much money do you want to start with"
              margin="normal"
              fullWidth = "true"
              required
              onChange={(e) => setFunds(e.target.value)}
              value={funds}
            />
            <FormGroup row>
            <FormControlLabel
              control={<Switch checked={leader} onChange={(evt)=>setLeader(evt.target.checked?true:false)} name="checkedA" />}
              label="I want to be a Leader" />
            </FormGroup>
            <Box my={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleClick}
              >
                Sign up now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Have an account?
              {' '}
              <Link
                component={RouterLink}
                to="/login"
                variant="h6"
              >
                Sign in
              </Link>
            </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
