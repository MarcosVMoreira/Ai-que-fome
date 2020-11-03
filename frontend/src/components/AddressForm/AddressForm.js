import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button, TextField, CircularProgress } from '@material-ui/core';

import classes from './AddressForm.module.scss';
import { validateNumber } from '../../helpers/validation';
import * as actions from '../../store/actions/index';

export const AddressForm = ({ address, handleClick }) => {
  const getLongInfo = field =>
    address.address_components.find(a => a.types.includes(field))?.long_name ||
    '';

  const getShortInfo = field =>
    address.address_components.find(a => a.types.includes(field))?.short_name ||
    '';

  const [form, setForm] = useState({
    city: getLongInfo('administrative_area_level_2') || '',
    complement: '',
    coordinates: '',
    country: getLongInfo('country') || '',
    district: getShortInfo('administrative_area_level_1') || '',
    neighborhood: getLongInfo('sublocality') || '',
    postalCode: getLongInfo('postal_code') || '',
    refPoint: '',
    streetName: getLongInfo('route') || '',
    streetNumber: getLongInfo('street_number') || '',
  });
  const [valid, setValid] = useState({
    streetNumber: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const postalCode = useSelector(state => state.customer.postalCode);
  const error = useSelector(state => state.customer.error);
  const loading = useSelector(state => state.customer.loading);

  const dispatch = useDispatch();
  const onViaCep = useCallback(address => dispatch(actions.viaCep(address)), [
    dispatch,
  ]);

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleViaCep = () => {
    if (valid.streetNumber) {
      onViaCep({
        city: form.city,
        district: form.district,
        streetName: form.streetName,
      });
    }
  };

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({ streetNumber: validateNumber(form.streetNumber) });
  }, [form]);

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to register the new user
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    // Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
    //   onNewCustomerAddress({
    //     ...form,
    //     postalCode: form.postalCode || postalCode,
    //   });
  };

  return (
    <form name="form" onSubmit={handleSubmit}>
      <Grid
        container
        item
        justify="center"
        direction="column"
        className={classes.container}
      >
        <Grid container alignItems="baseline">
          <div className={classes.container_title}>
            {form.streetName}
            {form.streetNumber ? `, ${form.streetNumber}` : ''}
          </div>
          <div className={classes.container_subtitle}>
            {form.city} - {form.district}, {form.country}
          </div>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="streetNumber"
              label="Número"
              variant="outlined"
              value={form.streetNumber}
              error={!valid.streetNumber && submitted}
              onChange={handleChange}
              onBlur={handleViaCep}
              fullWidth
              helperText={
                !valid.streetNumber && submitted && 'Número inválido!'
              }
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              name="complement"
              label="Complemento"
              variant="outlined"
              value={form.complement}
              onChange={handleChange}
              fullWidth
              helperText="Apartamento/Casa/Bloco"
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="refPoint"
            label="Ponto de Referência"
            variant="outlined"
            value={form.refPoint}
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress color="secondary" /> : 'Enviar'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
