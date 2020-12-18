import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import {
  validateDocument,
  validateName,
  validatePhone,
} from '../../../helpers/validation';
import * as actions from '../../../store/actions/index';
import classes from './Profile.module.scss';

export const Profile = () => {
  /* Redux Selectors */
  const customer = useSelector(state => state.customer.customer);
  const error = useSelector(state => state.customer.error);
  const loading = useSelector(state => state.customer.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onCustomerData = useCallback(() => dispatch(actions.customerData()), [
    dispatch,
  ]);
  const onCustomerEditData = customer =>
    dispatch(actions.customerEditData(customer));

  /* React State Hooks */
  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
    document: '',
    addresses: [],
  });
  const [valid, setValid] = useState({
    email: true,
    name: true,
    phone: true,
    document: true,
    addresses: true,
  });
  const [submitted, setSubmitted] = useState(false);

  /* Functions */
  // Loads customer Data on page enter
  useEffect(() => {
    onCustomerData();
  }, [onCustomerData]);

  // Set customer data after successful load
  useEffect(() => {
    if (customer) {
      setForm({
        email: customer.email || '',
        name: customer.name || '',
        phone: customer.phone || '',
        document: customer.taxPayerIdentificationNumber || '',
        addresses: customer.addresses || [],
      });
    }
  }, [customer]);

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    if (form) {
      setValid({
        email: true,
        name: validateName(form.name),
        phone: validatePhone(form.phone),
        document: validateDocument(form.document),
        addresses: true,
      });
    }
  }, [form]);

  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to edit the user information
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      onCustomerEditData(form);
  };

  let errorBlock;
  // If we get a 400 error, it means the user is trying to submit an incomplete form
  error === 400 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de de formulário, preencha todos os campos!
      </div>
    ));
  // Authentication error
  error === 401 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de autenticação, faça login novamente!
      </div>
    ));
  // Permission error
  error === 403 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de permissão, contate um administrador caso continue vendo este
        erro!
      </div>
    ));
  // Customer error
  error === 404 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro ao obter informações de usuário, tente novamente mais tarde
      </div>
    ));
  // Processing error
  error === 422 &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de processamento, por favor contate um administrador!
      </div>
    ));
  // Server error
  (error === 500 || error === 503 || error === 504) &&
    (errorBlock = (
      <div className={classes.card_subtitle}>
        Erro de servidor, por favor contate um administrador!
      </div>
    ));

  return (
    <div className={classes.container}>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        className={classes.container_body}
      >
        <Card className={classes.card}>
          <form name="form" onSubmit={handleSubmit}>
            <CardContent>
              <Grid container item justify="center">
                <span className={classes.card_title}>Edite seus dados</span>
              </Grid>

              <Grid container justify="center" item sm={12}>
                {errorBlock}
              </Grid>

              {loading ? (
                <Spinner />
              ) : (
                <Fragment>
                  <Grid container item justify="center" xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.email}
                      disabled
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12}>
                    <TextField
                      name="name"
                      label="Nome"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.name}
                      error={!valid.name && submitted}
                      onChange={handleChange}
                      helperText={!valid.name && submitted && 'Nome inválido!'}
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12}>
                    <InputMask
                      mask="999.999.999-99"
                      value={form.document}
                      onChange={handleChange}
                    >
                      {() => (
                        <TextField
                          name="document"
                          label="CPF"
                          variant="outlined"
                          className={classes.card_input}
                          error={!valid.document && submitted}
                          helperText={
                            !valid.document && submitted && 'CPF inválido!'
                          }
                        />
                      )}
                    </InputMask>
                  </Grid>

                  <Grid container item justify="center" xs={12}>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={form.phone}
                      onChange={handleChange}
                    >
                      {() => (
                        <TextField
                          name="phone"
                          label="Celular"
                          variant="outlined"
                          className={classes.card_input}
                          error={!valid.phone && submitted}
                          helperText={
                            !valid.phone &&
                            submitted &&
                            'Telefone Celular inválido!'
                          }
                        />
                      )}
                    </InputMask>
                  </Grid>
                </Fragment>
              )}
            </CardContent>

            <CardActions>
              <Grid container item justify="center" xs={12}>
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={loading}
                  className={classes.card_button}
                  fullWidth
                >
                  {loading ? <CircularProgress color="secondary" /> : 'Salvar'}
                </Button>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </div>
  );
};
