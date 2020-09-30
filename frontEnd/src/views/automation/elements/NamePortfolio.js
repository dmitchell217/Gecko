import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Card';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from 'axios'
import url from '../../../url'


const getID = () => {
    return localStorage.getItem("id")
  }

const NamePortfolio = ({onComplete}) => {
    const [name, setName] = useState("");

    const postName = (event) => {
        event.preventDefault();
        axios.post(`${url}/portfolios/name/${name}/${getID()}`)
        .then(res => {
            onComplete() // 
        })
        .catch(err => console.log(err));
    }
    return (
        <div>
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            {/* <Typography>Enter Your New Portfolio Name</Typography> */}
            <TextField
            variant="standard"
            placeholder="Portfolio Name"
            margin="normal"
            fullWidth = "true"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
        </Grid>
        <Button
            variant="contained"
            color="primary"
            onClick={postName}
            >Next</Button>
        </div>
    )
}

export default NamePortfolio
