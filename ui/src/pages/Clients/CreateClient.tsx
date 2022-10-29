import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { createClient, getClients } from "../../services/api";
import { StateContext } from "../../store/DataProvider";

export default function CreateClient() {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(StateContext);
  const initialState = {
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  };

  const [client, setClient] = useState(initialState);
  const { firstName, lastName, phoneNumber, email } = client;

  const onChange = (e: any) =>
    setClient({ ...client, [e.target.name]: e.target.value });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [txtFirstNameError, setTxtFirstNameError] = useState(false);
  const [txtLastNameError, setTxtLastNameError] = useState(false);
  const [txtPhoneNumberError, setTxtPhoneNumberError] = useState(false);
  const [txtEmailError, setTxtEmailError] = useState(false);

  const validateFields = () => {
    var isValid = true;
    if (!firstName) {
      setTxtFirstNameError(true);
      isValid = false;
    } else {
      setTxtFirstNameError(false);
    }
    if (!lastName) {
      setTxtLastNameError(true);
      isValid = false;
    } else {
      setTxtLastNameError(false);
    }
    if (!phoneNumber) {
      setTxtPhoneNumberError(true);
      isValid = false;
    } else {
      setTxtPhoneNumberError(false);
    }
    if (!email) {
      setTxtEmailError(true);
      isValid = false;
    } else {
      setTxtEmailError(false);
    }
    return isValid;
  };

  const handleCreateClient = () => {
    if (validateFields()) {
      createClient(client);
      setOpen(false);
      // handleRefresh();
      setTimeout(function () {
        handleRefresh();
      }, 500);
      clearState();
    }
  };

  const handleRefresh = () => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  };
  const clearState = () => {
    setClient({ ...initialState });
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        style={{ textTransform: "none" }}
      >
        Create new client
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create new client
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-basic"
                label="First name"
                variant="outlined"
                name="firstName"
                onChange={onChange}
                value={firstName}
                error={txtFirstNameError}
                helperText={txtFirstNameError ? "First name is required" : ""}
              />
              <TextField
                required
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                name="lastName"
                onChange={onChange}
                value={lastName}
                error={txtLastNameError}
                helperText={txtLastNameError ? "Last name is required" : ""}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                name="phoneNumber"
                onChange={onChange}
                value={phoneNumber}
                error={txtPhoneNumberError}
                helperText={
                  txtPhoneNumberError ? "Phone Number is required" : ""
                }
              />
              <TextField
                required
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={onChange}
                value={email}
                error={txtEmailError}
                helperText={txtEmailError ? "Email is required" : ""}
              />
            </Box>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={handleCreateClient}
            variant="contained"
            style={{ textTransform: "none" }}
          >
            Create client
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
