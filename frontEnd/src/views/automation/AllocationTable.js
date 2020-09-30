import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AllocationSlider from '../../components/AllocationSlider';
import axios from 'axios'
import url from '../../url'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container' ;

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});
let sendVals;
const getID = () => {
  return localStorage.getItem("id")
  // return '5f668a67cd1885550c833916'
}

export default function AllocationTable({onComplete}) {
  const [rows, setRows] = useState([]);
  // const [allValues, setAllValues] = useState([]);
  useEffect(() => {
    loadRows();
  }, []);
  const loadRows = () => {
    axios
      .get(`${url}/portfolios/addTickers/${getID()}`)
      .then(res => {
        const r = res.data.tickerData;
        setRows(r.sort((a,b)=> a.symbol < b.symbol ? -1:1));
        // setAllValues(r)
      })
      .catch(err => console.log(err));
  };
  const postAllocations = (event) => {
    event.preventDefault();
    let symbols = rows.map(r => r.symbol)
    let allocations = rows.map(r => r.allocation)
    axios.get(`${url}/portfolios/addAllocations/${getID()}/?symbols=${symbols.toString()}&allocations=${allocations.toString()}`)
    .then(res => {
        onComplete()
    })
    .catch(err => console.log(err));
  }
  const classes = useStyles();

  const calculateValuesMax = (updatedItem) => {
    let othersValue = rows.filter(v => v.symbol != updatedItem.symbol)
    .reduce((a, c) => c.allocation+a, 0)
    updatedItem.allocation = othersValue + updatedItem.allocation > 100 ? 100-othersValue : updatedItem.allocation
    setRows([...rows.filter(v => v.symbol != updatedItem.symbol), updatedItem].sort((a,b)=> a.symbol < b.symbol ? -1:1))
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Select your desired allocation using the sliders above</caption>
        <TableHead>
          <TableRow>
            {/* <TableCell align="right">Delete Stock</TableCell> */}
            <TableCell>Stock</TableCell>
            <TableCell align="right">Allocation amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right"><AllocationSlider value = {row.allocation} calculcateMax = {calculateValuesMax} symbol = {row.symbol}/></TableCell>
              {/* <TableCell align="right"><AllocationSlider
              ref={{(eval('var' + "allocationEditor" + row.symbol)} => {this.fieldEditor1 = fieldEditor1;}
              {...props}
              /></TableCell> */}
              {/* <TableCell align="right"><AllocationSlider
                ref={(fieldEditor1) => {this.fieldEditor1 = fieldEditor1;}}
              /></TableCell> */}
              {/* <TableCell align="right"><AllocationSlider/></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
          variant="contained"
          color="primary"
          onClick={postAllocations}
          >Next</Button>
    </TableContainer>
  );
}

