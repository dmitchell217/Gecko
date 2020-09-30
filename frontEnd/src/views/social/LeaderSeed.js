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

const LeaderSeed = ({ className,  ...rest }) => {
  const classes = useStyles();
  const [selectedLeaderIds, setSelectedLeaderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const getNum = (id) => {id.slice(0, 4)}

  const data = [
    { name: 'David Mitchell', email: 'dmitchell217@mail.com', monthlyPerformance: 126.12, followers: 1, id: '093244761-9', avatarUrl:`https://picsum.photos/200`},
    { name: 'Dick Boole', email: 'dboole0@craigslist.org', monthlyPerformance: 6.12, followers: 14, id: '093244761-9', avatarUrl:`https://picsum.photos/0932/200`},
    { name: 'Nydia Hartless', email: 'nhartless1@shareasale.com', monthlyPerformance: 143.08, followers: 5, id: '205138912-8', avatarUrl:'https://picsum.photos/2912/200'},
    { name: 'Luz Melledy', email: 'lmelledy2@smugmug.com', monthlyPerformance: -42.39, followers: 54, id: '737340667-X', avatarUrl:'https://picsum.photos/737/200'},
    { name: 'Lyda Swanton', email: 'lswanton3@oakley.com', monthlyPerformance: -55.2, followers: 29, id: '804346398-0', avatarUrl:'https://picsum.photos/8043/200'},
    { name: 'Yancey Tudbald', email: 'ytudbald4@myspace.com', monthlyPerformance: 32.92, followers: 27, id: '445985506-2', avatarUrl:'https://picsum.photos/449/200'},
    { name: 'Corney Lyptrit', email: 'clyptrit5@mediafire.com', monthlyPerformance: -53.18, followers: 10, id: '394498085-9', avatarUrl:'https://picsum.photos/394/200'},
    { name: 'Kristian Muslim', email: 'kmuslim6@answers.com', monthlyPerformance: 125.42, followers: 21, id: '918590293-4', avatarUrl:'https://picsum.photos/915/200'},
    { name: 'Cart Odams', email: 'codams8@opera.com', monthlyPerformance: 91.7, followers: 11, id: '683456122-6', avatarUrl:'https://picsum.photos/685/200'},
    { name: 'Kristian Muslim', email: 'kmuslim6@answers.com', monthlyPerformance: -39.65, followers: 7, id: '776881129-1', avatarUrl:'https://picsum.photos/80/200'}
  ]

  const handleSelectAll = (event) => {
    let newSelectedLeaderIds;

    if (event.target.checked) {
      newSelectedLeaderIds = data.map((d) => d.id);
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
              {data.slice(0, limit).map(data => (
                <TableRow
                  hover
                  key={data.id}
                  selected={selectedLeaderIds.indexOf(data.id) !== -1}
                >
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={data.avatarUrl}>
                        {getInitials(data.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {data.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{data.followers}</TableCell>
                  <TableCell>{data.monthlyPerformance.toFixed(2)}</TableCell>
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
        count={data.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LeaderSeed.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default LeaderSeed;
