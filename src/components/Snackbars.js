import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SuccessSnackbar = ({ text, openSnack, setOpenSnack }) => {
  const hideSnackBar = () => {
    setOpenSnack(false);
  };

  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={hideSnackBar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="success">{text}</Alert>
    </Snackbar>
  );
};

export const ErrorSnackbar = ({ error, textOverride, openSnack, setOpenSnack }) => {
  const hideSnackBar = () => {
    setOpenSnack(null);
  };

  let errorMessage = textOverride;

  if (error && !errorMessage) {
    if (error.hasOwnProperty("message")) {
      errorMessage = error.message;
    }
    errorMessage = "Error, please verify entry";
    console.log(error);
  }

  return (
    <Snackbar
      open={openSnack}
      onClose={hideSnackBar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={hideSnackBar} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
