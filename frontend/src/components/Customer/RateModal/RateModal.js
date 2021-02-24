import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import rating from '../../../assets/icons/rate.svg';

export const RateModal = props => {
  const [rate, setRate] = useState(1);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      maxWidth={'md'}
      fullScreen={fullScreen}
      open={props.open}
      onClose={() => props.close()}
    >
      <DialogTitle>Avalie o Restaurante</DialogTitle>

      <DialogContent>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginBottom: '10px' }}
        >
          <img
            src={rating}
            alt="rate draw"
            style={{ width: '200px', height: '150px' }}
          />

          <Typography variant="h6" component="h1">
            Como foi sua experiência?
          </Typography>

          <Rating
            name="rate"
            min={1}
            max={5}
            value={rate}
            onChange={(ev, val) => setRate(val)}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => props.close(rate)}
        >
          Avaliar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
