import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import url from '../../../url'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function PortfolioDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = useState("Dashboard");
  const [portfolioIDs, setPortfolioIDs] = useState([])
  const [portfolioNames, setPortfolioNames] = useState([])

  const getID = () => {
    return localStorage.getItem("id") // returns logged in users ID
  }

  const loadPortfolios = () => {
    axios
      .get(`${url}/portfolios/myPortfolios/${getID()}`)
      .then(res => {
        console.log('My portfolio names', res.data.names);
        console.log('My portfolio ids', res.data.ids);
        setPortfolioIDs(res.data.ids);
        setPortfolioNames(res.data.names);
        // returns at Number that represents a percent.
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadPortfolios()
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Switch Portfolios
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <StyledMenuItem>
        <ListItemText primary="Dashboard" onClick={()=> {
          console.log("Clicked on dashboard")
          localStorage.setItem("onPortfolio","Dashboard")
          window.location = "/user/dashboard"
        }} 
        />
        </StyledMenuItem>
        {portfolioNames.map((name, idx) => {
          return (
            <StyledMenuItem>
              <ListItemText primary={name} onClick={()=> {
              console.log(`Clicked on ${name}`)
              localStorage.setItem("onPortfolio", portfolioIDs[idx])
              window.location = "/user/dashboard"
              }}
              />
            </StyledMenuItem>
        )})}
      </StyledMenu>
    </div>
  );
}
