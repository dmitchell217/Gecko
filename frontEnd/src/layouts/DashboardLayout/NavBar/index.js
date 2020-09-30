import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ToggleRight as ToggleRightIcon,
  PieChart as PieChartIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import url from '../../../url'
import axios from 'axios'


// const user = {
//   avatar: 'https://picsum.photos/200',
//   jobTitle: 'Leader',
//   name: 'Rashad Collins',
//   leader: true
// };

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const [name, setName] = React.useState("");
  useEffect(() => {
    loadName();
  }, []);
  const loadName = () => {
    axios
      .get(`${url}/users/name/${localStorage.getItem("id")}`)
      .then(res => {
        console.log('Users name', res.data.rv);
        const r = res.data.rv;
        setName(r);
      })
      .catch(err => console.log(err));
  };

  const user = {
    avatar: 'https://picsum.photos/200',
    jobTitle: localStorage.getItem("leader") ? "Leader" : "Follower",
    name: name,
    leader: localStorage.getItem("leader")
  }
  let route;

  const LeadFollowRoute = user => {
    user.leader = true ? (route = 'user') : (route = 'user');
  };
  LeadFollowRoute(user);

  const items = [
    {
      href: `/${route}/dashboard`,
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: `/${route}/social`,
      icon: UsersIcon,
      title: 'Social'
    },
    {
      href: `/${route}/automations`,
      icon: ToggleRightIcon,
      title: 'Automation'
    },
    {
      href: `/${route}/Portfolio`,
      icon: PieChartIcon,
      title: 'Portfolio'
    }
  ];
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to={`/${route}/account`}
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
