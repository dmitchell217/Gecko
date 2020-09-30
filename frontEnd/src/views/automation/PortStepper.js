import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Card';
import AssetTable from './AssetTable';
import AllocationSlider from '../../components/AllocationSlider';
import AllocationTable from './AllocationTable';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SelectAllocation from './SelectAllocation';
import NamePortfolio from './elements/NamePortfolio'




const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return ['Name your new portfolio','Add funds to your new portfolio','Select Stock(s)', 'Determine allocations'];
}
// const postName = () => {
//   let name = "My new Portfolio" // @RASHAD THIS IS DUMMY DATA, WE NEED TO MAKE THIS DYNAMIC. 
  
// }


export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (<NamePortfolio onComplete = {handleNext} />)
      case 1:
        return (<SelectAllocation onComplete = {handleNext}/>);
      case 2:
        return (<AssetTable onComplete = {handleNext}/>) ;
      case 3:
        return (<AllocationTable onComplete = {handleNext}/>);
      default:
        return 'Portfolio Created';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button> */}
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button> */}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Your Portfolio has been created</Typography>
          {/* <Button onClick={handleReset} className={classes.button}>
            Save
          </Button> */}
        </Paper>
      )}
    </div>
  );
}
