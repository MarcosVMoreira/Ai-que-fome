import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

export const Toast = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
