import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Infos from "../../containers/Infos/infoUser";
import Photos from "../../containers/Infos/photos";
import Finished from "./finished";
import Localisation from "../../containers/Infos/Localisation";
import "./uesrInfos.css";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CircularProgress from '@material-ui/core/CircularProgress';


const steps = ["Information", "Photos", "Localisation"];


function getStepContent(step) {
  switch (step) {
    case 0:
      return <Infos />;
    case 1:
      return <Photos />;
    case 2:
      return <Localisation />;
    default:
      return "Unknown step";
  }
}

const Profile = (props) => {
  const { handleBack, handleNext, user, images } = props;
  const activeStep = user.step;
  return (
    <React.Fragment>
      {activeStep !== 'loading' &&
        < Grid
          container
          className="profilContainer"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={7} container className="profileContainer">
            <Grid
              item
              xs={12}
              lg={3}
              className="profileImageContainer"
              container
              justify="center"
              alignItems="center"
            >
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className="stepperContainer"
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel className="stepLabel">
                      <h2>{label}</h2>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <React.Fragment>
              
                <React.Fragment>
                  <Grid
                    item
                    container
                    xs={12}
                    lg={9}
                    className="profileInputContainer"
                    justify="center"
                    alignItems="center"
                  >
                    {activeStep === steps.length ? (
                  <Finished />
              ) : (
                    <Grid
                      container
                      item
                      sm={12}
                      justify="center"
                      alignItems="center"
                      spacing={4}
                    >
                      <Grid
                        container
                        item
                        sm={10}
                        justify="center"
                        alignItems="center"
                      >
                        {getStepContent(activeStep)}
                      </Grid>
                      <Grid
                        container
                        item
                        sm={6}
                        justify="center"
                        alignItems="center"
                        spacing={2}
                      >
                        {(activeStep === 1 || activeStep === 2) &&
                          <Grid item sm={2}>
                            <Button
                              color="secondary"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              style={{ color: "#C51162" }}>
                              Back
                            </Button>

                            {
                              images.isImages === true &&
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleNext}
                                className="profileBtn"> Next
                          <ArrowForwardIosIcon className="forward" />
                              </Button>

                            }
                          </Grid>
                        }
                      </Grid>
                    </Grid>)}
                  </Grid>                  </React.Fragment>
              
            </React.Fragment>
            {/* {(activeStep === 1 || activeStep === 2) &&
              <Grid item sm={2}>
                <Button
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ color: "#C51162" }}>
                  Back
                      </Button>
              </Grid>
              &&
              <Grid item sm={6}>
                {
                  images.isImages === true &&
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                    className="profileBtn"> Next
                          <ArrowForwardIosIcon className="forward" />
                  </Button>

                }
              </Grid>
            } */}
          </Grid>
        </Grid>}
      {activeStep === "loading" && <CircularProgress color="secondary" />}
    </React.Fragment >
  );
}
export default Profile;
