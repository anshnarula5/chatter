import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Popup = () => {
  const alerts = useSelector((state) => state.alert);
  const vertical = "top";
  const horizontal = "center";
  return (
    alerts !== null &&
    alerts.length !== 0 &&
    alerts.map((alert) => (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent="SlideTransition"
      >
        <Alert severity={alert.alertType}>{alert.msg}</Alert>
      </Snackbar>
    ))
  );
};

export default Popup;
