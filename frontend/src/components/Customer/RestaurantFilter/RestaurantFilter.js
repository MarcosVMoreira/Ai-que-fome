import { Chip, Fab, Grid, Popover, Slider } from '@material-ui/core';
import { SearchIcon } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { categories, payments } from '../../../helpers/enums';
import * as actions from '../../../store/actions/index';
import classes from './RestaurantFilter.module.scss';

export const RestaurantFilter = () => {
  const [feePopover, setFeePopover] = useState(null);
  const [distancePopover, setDistancePopover] = useState(null);
  const [categoryPopover, setCategoryPopover] = useState(null);
  const [paymentPopover, setPaymentPopover] = useState(null);
  const [feeValue, setFeeValue] = useState(25);
  const [distanceValue, setDistanceValue] = useState(25);
  const [categoryValue, setCategoryValue] = useState([]);
  const [paymentValue, setPaymentValue] = useState([]);

  /* Redux Selectors */
  const filter = useSelector(state => state.restaurant.filter);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurantsFilter = payload =>
    dispatch(actions.fetchRestaurantsFilter(payload));
  const onFetchRestaurants = payload =>
    dispatch(actions.fetchRestaurants(payload));

  // Fetch restaurants based on selected categories
  const handleFilter = () => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      onFetchRestaurantsFilter({
        coordinates: JSON.parse(storedAddress).coordinates,
        fee: feeValue >= 0 && feeValue < 25 ? feeValue : null,
        type: categoryValue.length !== 0 ? categoryValue.join(',') : null,
        payment: paymentValue.length !== 0 ? paymentValue.join(',') : null,
        distance: distanceValue && distanceValue !== 25 ? distanceValue : null,
      });
    }
  };

  // Clears Filters
  const handleFilterReset = () => {
    const storedAddress = localStorage.getItem('IFOOD_address');

    setFeeValue(25);
    setDistanceValue(25);
    setCategoryValue([]);
    setPaymentValue([]);

    if (storedAddress) {
      onFetchRestaurants({
        coordinates: JSON.parse(storedAddress).coordinates,
      });
    }
  };

  return (
    <Grid
      item
      xs
      container
      spacing={1}
      alignItems="center"
      className={classes.container}
      wrap="nowrap"
    >
      <Grid item>
        <Fab
          variant="extended"
          color={feeValue >= 0 && feeValue < 25 ? `primary` : `secondary`}
          size="medium"
          onClick={ev => setFeePopover(ev.currentTarget)}
          className={classes.container_fab}
        >
          {feeValue && feeValue !== 25
            ? `Até R$${feeValue.toFixed(2).replace('.', ',')}`
            : feeValue === 0
            ? `Entrega Grátis`
            : `Entrega`}
        </Fab>
      </Grid>

      <Grid item>
        <Fab
          variant="extended"
          color={categoryValue.length !== 0 ? 'primary' : 'secondary'}
          size="medium"
          onClick={ev => setCategoryPopover(ev.currentTarget)}
          className={classes.container_fab}
        >
          {categoryValue && categoryValue.length === 1
            ? `${categories[categoryValue[0]]}`
            : categoryValue.length > 0
            ? `${categories[categoryValue[0]]} + ${categoryValue.length - 1}`
            : 'Cozinhas'}
        </Fab>
      </Grid>

      <Grid item>
        <Fab
          variant="extended"
          color={paymentValue.length !== 0 ? 'primary' : 'secondary'}
          size="medium"
          onClick={ev => setPaymentPopover(ev.currentTarget)}
          className={classes.container_fab}
        >
          {paymentValue && paymentValue.length === 1
            ? `${payments[paymentValue[0]]}`
            : paymentValue.length > 0
            ? `${payments[paymentValue[0]]} + ${paymentValue.length - 1}`
            : 'Pagamento'}
        </Fab>
      </Grid>

      <Grid item>
        <Fab
          variant="extended"
          color={
            distanceValue && distanceValue !== 25 ? 'primary' : 'secondary'
          }
          size="medium"
          onClick={ev => setDistancePopover(ev.currentTarget)}
          className={classes.container_fab}
        >
          {distanceValue && distanceValue !== 25
            ? `Até ${distanceValue.toFixed(1).replace('.', ',')}km`
            : `Distância`}
        </Fab>
      </Grid>

      <Grid item>
        <Fab
          color="primary"
          size="small"
          onClick={handleFilter}
          className={classes.container_fab}
        >
          <SearchIcon />
        </Fab>
      </Grid>

      <Grid item style={{ marginLeft: 'auto' }}>
        {filter && (
          <Fab
            variant="extended"
            color="primary"
            size="medium"
            onClick={handleFilterReset}
            className={classes.container_fab}
          >
            <Delete />
            Limpar
          </Fab>
        )}
      </Grid>

      <Popover
        open={Boolean(feePopover)}
        anchorEl={feePopover}
        onClose={() => setFeePopover(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid
          container
          direction="column"
          className={classes.container_popover}
        >
          <h3 className={classes.container_popover__title}>Taxa de Entrega</h3>

          {feeValue ? (
            <span className={classes.container_popover__subtitle}>
              Até R${feeValue.toFixed(2).replace('.', ',')}
            </span>
          ) : (
            <span className={classes.container_popover__subtitle}>
              Entrega Grátis
            </span>
          )}

          <div className={classes.container_popover__slider}>
            <Slider
              value={feeValue}
              onChange={(ev, value) => setFeeValue(value)}
              step={1}
              min={0.0}
              max={25.0}
              valueLabelDisplay="auto"
            />
          </div>
        </Grid>
      </Popover>

      <Popover
        open={Boolean(categoryPopover)}
        anchorEl={categoryPopover}
        onClose={() => setCategoryPopover(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid container className={classes.container_popover}>
          <Grid item>
            <h3 className={classes.container_popover__title}>Cozinhas</h3>
          </Grid>

          <Grid
            item
            container
            direction="row"
            wrap="wrap"
            spacing={1}
            className={classes.container_popover__list}
          >
            {Object.keys(categories).map(el => (
              <Grid item key={el}>
                <Chip
                  clickable
                  color={categoryValue.includes(el) ? 'primary' : 'secondary'}
                  label={categories[el]}
                  onClick={() =>
                    setCategoryValue(state =>
                      state.includes(el)
                        ? state.filter(item => item !== el)
                        : [...state, el],
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Popover>

      <Popover
        open={Boolean(paymentPopover)}
        anchorEl={paymentPopover}
        onClose={() => setPaymentPopover(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Grid container className={classes.container_popover}>
          <Grid item>
            <h3 className={classes.container_popover__title}>Pagamento</h3>
          </Grid>

          <Grid
            item
            container
            direction="row"
            wrap="wrap"
            spacing={1}
            className={classes.container_popover__list}
          >
            {Object.keys(payments).map(el => (
              <Grid item key={el}>
                <Chip
                  clickable
                  color={paymentValue.includes(el) ? 'primary' : 'secondary'}
                  label={payments[el]}
                  onClick={() =>
                    setPaymentValue(state =>
                      state.includes(el)
                        ? state.filter(item => item !== el)
                        : [...state, el],
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Popover>

      <Popover
        open={Boolean(distancePopover)}
        anchorEl={distancePopover}
        onClose={() => setDistancePopover(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Grid
          container
          direction="column"
          className={classes.container_popover}
        >
          <h3 className={classes.container_popover__title}>Distância</h3>

          <span className={classes.container_popover__subtitle}>
            Até {distanceValue.toFixed(1).replace('.', ',')}km
          </span>

          <div className={classes.container_popover__slider}>
            <Slider
              value={distanceValue}
              onChange={(ev, value) => setDistanceValue(value)}
              step={0.5}
              min={0.5}
              max={25.0}
              valueLabelDisplay="auto"
            />
          </div>
        </Grid>
      </Popover>
    </Grid>
  );
};
