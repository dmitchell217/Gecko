import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: 'https://picsum.photos/200',
  city: 'Atlanta',
  country: 'USA',
  leader: true,
  name: 'Rashad Collins',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const ProfileCard = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {user.leader ? 'Leader' : 'Follower'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {/* <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button> */}
      </CardActions>
    </Card>
  );
};

ProfileCard.propTypes = {
  className: PropTypes.string
};

export default ProfileCard;
