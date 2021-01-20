import { Box, CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

export const Spinner = ({ color = 'primary' }) => {
  return (
    <Grid container justify="center">
      <Box mx="auto" mb={2}>
        <CircularProgress color={color} />
      </Box>
    </Grid>
  );
};
