import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Leaders = ({ className, leaders, ...rest }) => {
  const classes = useStyles();
  const [selectedLeaderIds, setSelectedLeaderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedLeaderIds;

    if (event.target.checked) {
      newSelectedLeaderIds = leaders.map((leader) => leader.id);
    } else {
      newSelectedLeaderIds = [];
    }

    setSelectedLeaderIds(newSelectedLeaderIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedLeaderIds.indexOf(id);
    let newSelectedLeaderIds = [];

    if (selectedIndex === -1) {
      newSelectedLeaderIds = newSelectedLeaderIds.concat(selectedLeaderIds, id);
    } else if (selectedIndex === 0) {
      newSelectedLeaderIds = newSelectedLeaderIds.concat(selectedLeaderIds.slice(1));
    } else if (selectedIndex === selectedLeaderIds.length - 1) {
      newSelectedLeaderIds = newSelectedLeaderIds.concat(selectedLeaderIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedLeaderIds = newSelectedLeaderIds.concat(
        selectedLeaderIds.slice(0, selectedIndex),
        selectedLeaderIds.slice(selectedIndex + 1)
      );
    }

    setSelectedLeaderIds(newSelectedLeaderIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>Monthly Change(%)</TableCell>
                {/* <TableCell>Performance</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {leaders.slice(0, limit).map(leader => (
                <TableRow
                  hover
                  key={leader.id}
                  selected={selectedLeaderIds.indexOf(leader.id) !== -1}
                >
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={leader.avatarUrl}>
                        {getInitials(leader.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {leader.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{leader.followers}</TableCell>
                  <TableCell>{leader.monthlyPerformance.toFixed(2)}</TableCell>
                  <TableCell>
                    <Box>

                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={leaders.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Leaders.propTypes = {
  className: PropTypes.string,
  leaders: PropTypes.array.isRequired
};

export default Leaders;
