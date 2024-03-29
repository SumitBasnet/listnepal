import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return; 
    }

    setOpen(false);
  };
	console.log(open)

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  		<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
   			 {props.message}
  		</Alert>
		</Snackbar>
  );
}
