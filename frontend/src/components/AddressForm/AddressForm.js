import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { validateNumber, validatePostalCode } from '../../helpers/validation';
import * as actions from '../../store/actions/index';
import classes from './AddressForm.module.scss';

export const AddressForm = ({ address, handleClick, editAddressId }) => {
  /* Helper Functions */
  // Customer Address Long version
  const getLongInfo = field =>
    address.address_components.find(a => a.types.includes(field))?.long_name ||
    '';

  // Customer Address Short version
  const getShortInfo = field =>
    address.address_components.find(a => a.types.includes(field))?.short_name ||
    '';

  /* React State Hooks */
  const [form, setForm] = useState({
    city: getLongInfo('administrative_area_level_2') || '',
    complement: '',
    coordinates: null,
    favorite: false,
    country: getLongInfo('country') || '',
    district: getShortInfo('administrative_area_level_1') || '',
    neighborhood: getLongInfo('sublocality') || '',
    postalCode: getLongInfo('postal_code') || '',
    refPoint: '',
    streetName: getLongInfo('route') || '',
    streetNumber: getLongInfo('street_number') || '',
  });
  const [valid, setValid] = useState({ streetNumber: true, postalCode: true });
  const [submitted, setSubmitted] = useState(false);

  /* Redux Selectors */
  const loading = useSelector(state => state.customer.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onNewCustomerAddress = form =>
    dispatch(actions.customerNewAddress(form));
  const onEditCustomerAddress = (form, addressId) =>
    dispatch(actions.customerEditAddress(form, addressId));

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({
      streetNumber: validateNumber(form.streetNumber),
      postalCode: validatePostalCode(form.postalCode),
    });
  }, [form]);

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to register the new user
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(valid).reduce((sum, value) => sum && valid[value], true)) {
      if (editAddressId) {
        onEditCustomerAddress(form, editAddressId);
      } else {
        onNewCustomerAddress(form);
      }
      handleClick(form);
    }
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
          <Grid item xs={12} sm={6}>
            <InputMask
              mask="99999-999"
              value={form.postalCode}
              onChange={handleChange}
            >
              {() => (
                <TextField
                  required
                  fullWidth
                  name="postalCode"
                  label="CEP"
                  variant="outlined"
                  className={classes.card_input}
                  error={!valid.postalCode && submitted}
                  helperText={!valid.postalCode && submitted && 'CEP inválido!'}
                />
              )}
            </InputMask>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="streetNumber"
              label="Número"
              variant="outlined"
              value={form.streetNumber}
              error={!valid.streetNumber && submitted}
              onChange={handleChange}
              fullWidth
              helperText={
                !valid.streetNumber && submitted && 'Número inválido!'
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="refPoint"
              label="Ponto de Referência"
              variant="outlined"
              value={form.refPoint}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
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
