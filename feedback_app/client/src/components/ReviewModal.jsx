import { useState, useEffect } from "react";
import ReviewConfirmation from "./ReviewConfirmation";
import { Button, DialogTitle, DialogContent, DialogActions, Dialog, Stepper, Step, Rating, StepLabel, Divider, Typography, Box, Grid, TextField, MenuItem } from "@mui/material";

const countries = [
  {
    value: "pakistan",
    label: "Pakistan",
  },
  {
    value: "india",
    label: "India",
  },
  {
    value: "united states",
    label: "United States",
  }
];

// Add the DialogHeader() function here
function DialogHeader({ activeStep }) {
  return (
    <>
      {activeStep !== 2 && (
        <Stepper
          activeStep={activeStep}
          sx={{ width: "200px", marginY: 2, marginX: "auto" }}
        >
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      )}
      {activeStep === 0 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            User Details
          </Typography>
          <Typography> Enter your details to submit review </Typography>
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Submit Your Reviews
          </Typography>
          <Typography>
            How would you rate your experience with our product
          </Typography>
        </Box>
      )}
      {activeStep !== 2 && (
        <Divider
          width="100"
          sx={{ margin: "auto", marginTop: 2, background: "black" }}
        />
      )}
    </>
  );
}


export default function ReviewModal(props) {
  const { onClose, value: valueProp, open, productID, ...other } = props; // this is the value of the modal
  const [value, setValue] = useState(valueProp);   // this is the active step of the modal
  const [activeStep, setActiveStep] = useState(0);   // this is the active step of the modal
  const [quality, setQuality] = useState(0);   // this is the quality rating
  const [utility, setUtility] = useState(0);   // this is the utility rating
  const [availability, setAvailability] = useState(0);   // this is the availability rating
  const [overallRating, setOverallRating] = useState(0);   // this is the overall rating
  const [comment, setComment] = useState("");   // this is the comment
  const [name, setName] = useState(""); // this is the name
  const [email, setEmail] = useState(""); // this is the email
  const [city, setCity] = useState(""); // this is the city
  const [country, setCountry] = useState(""); // this is the country
  const [stepOneError, setStepOneError] = useState({}); // this is the error for step one
  const [stepTwoError, setStepTwoError] = useState(false); // this is the error for step two
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // this is to track whether the review is submitted or not

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    // calculate the overall rating
    let rating = (quality + utility + availability) / 3;
    // update the overall rating state
    setOverallRating(Math.round(rating * 10) / 10);
  }, [quality, availability, utility]);

  async function submitReview(productID) {
    const newFeedback = {
      "user_id": 10,
      "product_id": productID,
      "rating": parseInt(overallRating, 10),
      "comment": comment
    }

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_BROWSER_URL}:3000/products/${productID}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(newFeedback)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Review submitted successfully!");
        setReviewSubmitted(true);
      } else {
        console.log("Something went wrong while submitting your review:", data);
      }
    } catch (error) {
      console.log("Request error");
      console.log(error);
    }
  }

  const handleCancel = () => {
    setActiveStep(0);
    onClose();
  };

  const checkNextStep = () => {
    if (activeStep === 0) {
      if (name.length === 0) {
        // If the name is empty, then show the error message
        let _error = { ...stepOneError };
        _error.country = false;
        _error.city = false;
        _error.name = true;
        _error.email = false;
        setStepOneError(_error);
        return;
      } else {
        // If the name is not empty, then check if the name is valid
        if (/^[a-zA-Z\s]+$/.test(name)) {
          let _error = { ...stepOneError };
        _error.name = false;
          setStepOneError(_error);
        } else {
          // If the name is not valid, then show the error message
          let _error = { ...stepOneError };
          _error.name = true;
          setStepOneError(_error);
          return;
        }
      }
      // If the email is empty, then show the error message
      if (email.length === 0) {
        // If the email is empty, then show the error message
        let _error = { ...stepOneError };
        _error.country = false;
        _error.city = false;
        _error.name = false;
        _error.email = true;
        setStepOneError(_error);
        return;
      } else {
        // If the email is not empty, then check if the email is valid
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          let _error = { ...stepOneError };
          _error.email = false;
          setStepOneError(_error);
      } else {
        // If the email is not valid, then show the error message
        let _error = { ...stepOneError };
        _error.email = true;
        setStepOneError(_error);
        return;
      }
    }
    // If the city is empty, then show the error message
    if (city.length === 0) {
      // If the city is empty, then show the error message
      let _error = { ...stepOneError };
      _error.country = false;
      _error.city = true;
      _error.name = false;
      _error.email = false;
      setStepOneError(_error);
      return;
    } else {
      // If the city is not empty, then check if the city is valid
      if (/^[a-zA-Z]+$/.test(city)) {
        let _error = { ...stepOneError };
        _error.city = false;
        setStepOneError(_error);
      } else {
        // If the city is not valid, then show the error message
        let _error = { ...stepOneError };
        _error.city = true;
        setStepOneError(_error);
        return;
      }
    }
    // If the country is empty, then show the error message
    if (country.length === 0) {
      // If the country is empty, then show the error message
      let _error = { ...stepOneError };
      _error.country = true;
      _error.city = false;
      _error.name = false;
      _error.email = false;
      setStepOneError(_error);
      return;
    }
    // If the country is not empty, then check if the country is valid
    let _error = { ...stepOneError };
    _error.country = false;
    _error.city = false;
    _error.name = false;
    _error.email = false;
    setStepOneError(_error);
  }

  // if the active step is 1 then validate the form
  if (activeStep === 1) {
    // If the utility, availability, or quality is 0, then show the error message
    if (utility === 0 || availability === 0 || quality === 0) {
      setStepTwoError(true);
      return;
    }

    setStepTwoError(false);
    submitReview(productID);
  }
  // If the active step is 2, then close the dialog
  activeStep === 2 ? onClose(value) : setActiveStep((prev) => prev + 1);
};

  return (
    <Dialog sx={{"& .MuiDialog-paper": {width: "80%",minHeight: 500,borderRadius: "18px",textAlign: "center"},}} maxWidth="sm" open={open} {...other}>
        <DialogTitle sx={{marginX: "auto",marginBottom: 1,"& .Mui-active": {color: "#00B65E !important"},"& .Mui-completed": {color: "#00B65E !important"}}}>
          <DialogHeader activeStep={activeStep} />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ paddingX: 3 }}>
            {activeStep === 0 && (
              <Box>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Full Name"
                      name="name"
                      value={name}
                      variant="outlined"
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      error={stepOneError?.name ? true : false}
                      helperText={
                        stepOneError?.name ? "Enter your name. Alphabets only." : ""
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      value={email}
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                      error={stepOneError?.email ? true : false}
                      helperText={
                        stepOneError?.email ? "Please enter a valid email." : ""
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      name="city"
                      value={city}
                      variant="outlined"
                      onChange={(e) => setCity(e.target.value)}
                      fullWidth
                      error={stepOneError?.city ? true : false}
                      helperText={
                        stepOneError?.city ? "Enter your city. Alphabets only." : ""
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      name="country"
                      label="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      fullWidth
                      error={stepOneError?.country ? true : false}
                      helperText={
                        stepOneError?.country ? "Please select country." : ""
                      }
                      required
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeStep === 1 && (
              <Box maxWidth={470} sx={{ marginX: "auto" }}>
                <Box sx={{display: "flex",justifyContent: "space-between",paddingX: 3,paddingY: 1.5}}>
                  <Grid container>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                      <Typography>Product Quality</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                      <Rating
                        value={quality}
                        onChange={(event) => {
                          setQuality(Number(event.target.value));
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: 3,
                    paddingY: 1.5,
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                      <Typography>Product Availability</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                      <Rating
                        value={availability}
                        onChange={(event) =>
                          setAvailability(Number(event.target.value))
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: 3,
                    paddingY: 1.5,
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                      <Typography>Product Utility</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                      <Rating
                        value={utility}
                        onChange={(event) =>
                          setUtility(Number(event.target.value))
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                {stepTwoError ? (
                  <Grid container>
                    <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
                      <Typography>
                        Please give your feedback on all aspects.
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
                <TextField
                  multiline
                  rows={3}
                  placeholder="Leave a comment"
                  variant="filled"
                  fullWidth
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  sx={{
                    marginTop: 3,
                    "& .MuiFilledInput-root:before": {
                      border: "none ",
                    },
                  }}
                />
              </Box>
            )}
            {activeStep === 2 && <ReviewConfirmation rating={overallRating} />}
          </Box>
        </DialogContent>
        <DialogActions sx={{ marginX: 2, marginY: 1 }}>
          {activeStep !== 2 ? (
            <Button
              autoFocus
              onClick={handleCancel}
              sx={{
                background: "#E7E7E7",
                borderRadius: "18px",
                paddingX: 2,
                height: "28px",
                textTransform: "none",
                color: "black",
                "&:hover": {},
              }}
            >
              Cancel
            </Button>
          ) : (
            <></>
          )}
          <Button
            onClick={checkNextStep}
            sx={{
              background: "#00B65E",
              borderRadius: "18px",
              paddingX: 1.3,
              height: "28px",
              textTransform: "none",
              color: "white",
              "&:hover": {
                background: "#1b5e20",
              },
            }}
          >
            {activeStep == " 0 " && "Next"}
            {activeStep == " 1 " && "Submit Review"}
            {activeStep == " 2 " && "Finish"}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
