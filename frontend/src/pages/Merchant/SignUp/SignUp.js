import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useCallback, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Logo } from '../../../components/Shared/Logo/Logo';
import { Toast } from '../../../components/Shared/Toast/Toast';
import {
  validateCompanyDocument,
  validateEmail,
  validateName,
  validatePhone,
  validatePostalCode,
} from '../../../helpers/validation';
import * as actions from '../../../store/actions/index';
import classes from './SignUp.module.scss';

export const SignUp = props => {
  /* Redux Selectors */
  const signUpMail = useSelector(state => state.auth.signUpMail);
  const error = useSelector(state => state.signUp.error);
  const loading = useSelector(state => state.signUp.loading);
  const success = useSelector(state => state.signUp.success);
  const postalCodeError = useSelector(state => state.locate.error);
  const states = useSelector(state => state.locate.states);
  const cities = useSelector(state => state.locate.cities);
  const address = useSelector(state => state.locate.address);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onMerchantSignUp = form => dispatch(actions.merchantSignUp(form));
  const onErrorReset = () => dispatch(actions.errorReset());
  const onAuthReset = () => dispatch(actions.authReset());
  const onFetchStates = useCallback(() => dispatch(actions.fetchStates()), [
    dispatch,
  ]);
  const onFetchCities = useCallback(
    state => dispatch(actions.fetchCities(state)),
    [dispatch],
  );
  const onFetchAddress = postalCode =>
    dispatch(actions.fetchAddress(postalCode));

  /* React State Hooks (if the user tried to Login using a non-existing mail
    we initialize the form with the attempted mail) */
  const [form, setForm] = useState({
    email: signUpMail || '',
    name: '',
    phone: '',
    document: '',
    hourStart: new Date(),
    hourEnd: new Date(),
    logo: '',
    postalCode: '',
    state: '',
    city: '',
    neighborhood: '',
    streetName: '',
    streetNumber: '',
  });
  const [valid, setValid] = useState({
    email: true,
    name: true,
    phone: true,
    document: true,
    hourStart: true,
    hourEnd: true,
    logo: true,
    postalCode: true,
    state: true,
    city: true,
    neighborhood: true,
    streetName: true,
    streetNumber: true,
  });
  const [submitted, setSubmitted] = useState(false);

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Set the state and fetch the state cities
  const handleState = (event, value) => {
    setForm({ ...form, state: value, city: '' });
    onFetchCities(value);
  };

  // Set the chosen city
  const handleCity = (event, value) => {
    setForm({ ...form, city: value });
  };

  const handleHourStart = value => {
    setForm({ ...form, hourStart: value });
  };

  const handleHourEnd = value => {
    setForm({ ...form, hourEnd: value });
  };

  // Fetches the user address by postalCode
  const handleAddress = () => {
    if (validatePostalCode(form.postalCode)) {
      onFetchAddress(form.postalCode);
    }
  };

  // On page load fetch all the states
  useEffect(() => {
    onFetchStates();
  }, [onFetchStates]);

  // Each time we fetch the user address by postalCode, fill the fields
  useEffect(() => {
    if (address) {
      setForm(state => ({
        ...state,
        streetName: address.logradouro,
        state: address.uf,
        neighborhood: address.bairro,
        city: address.localidade,
      }));

      onFetchCities(address.uf);
    }
  }, [address, onFetchCities]);

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      document: validateCompanyDocument(form.document),
      hourStart: Boolean(form.hourStart),
      hourEnd: Boolean(form.hourEnd),
      logo: Boolean(form.logo),
      postalCode: Boolean(form.postalCode),
      state: Boolean(form.state),
      city: Boolean(form.city),
      neighborhood: Boolean(form.neighborhood),
      streetName: Boolean(form.streetName),
      streetNumber: Boolean(form.streetNumber),
    });
  }, [form]);

  // On Logo click redirect to login page
  const handleReset = () => {
    onErrorReset();
    props.history.push('/merchant/login');
  };

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to register the new user
  const handleSubmit = event => {
    event.preventDefault();

    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      onAuthReset() &&
      onMerchantSignUp(form);
  };

  // Set Toast
  const setToast = message => {
    return (
      <Snackbar
        open={true}
        autoHideDuration={10000}
        onClose={() => (toast = '')}
      >
        <Toast onClose={() => (toast = '')} severity="error">
          {message}
        </Toast>
      </Snackbar>
    );
  };

  let toast;
  let redirect;
  // If we get a 400 error from viacep, it means the server couldn't find the address from the postal code
  postalCodeError === 400 &&
    (toast = setToast('CEP não encontrado, tente novamente!'));
  // If we get a 400 error, it means the user is trying to submit an incomplete form
  error === 400 &&
    (toast = setToast('Erro de de formulário, preencha todos os campos!'));
  // If we get a 403 error, it means the user is trying to access something it doesn't have access
  error === 403 &&
    (toast = setToast(
      'Erro de permissão, contate um administrador caso continue vendo este erro!',
    ));
  // If we get a 404 error, it means the user reached a null pointer!
  error === 404 &&
    (toast = setToast(
      'Erro de acesso, contate um administrador caso continue vendo este erro!',
    ));
  // If we get 500, 503 or 504 redirects the user to not found page
  (error === 500 || error === 503 || error === 504) &&
    (redirect = <Redirect to="/not-found" />);
  // If register was successful redirects to login!
  redirect = success && <Redirect to="/merchant/login" />;

  return (
    <div className={classes.container}>
      {redirect}
      {toast}

      <Grid container className={classes.container_body}>
        <Grid item xs={12} className={classes.container_body__wrapper}>
          <Card className={classes.card}>
            <form name="form" onSubmit={handleSubmit}>
              <CardContent>
                <Logo handleClick={handleReset} merchant />

                <Grid container item justify="center">
                  <Grid container item justify="center" xs={12}>
                    <span className={classes.card_title}>
                      Dados do Restaurante
                    </span>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <TextField
                      name="email"
                      label="Email para Acesso"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.email}
                      error={(!valid.email && submitted) || error === 422}
                      onChange={handleChange}
                      helperText={
                        (!valid.email && submitted && 'Email inválido!') ||
                        (error === 422 && 'Email já cadastrado!')
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <TextField
                      name="name"
                      label="Nome do Restaurante"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.name}
                      error={!valid.name && submitted}
                      onChange={handleChange}
                      helperText={
                        !valid.name &&
                        submitted &&
                        'Nome do Restaurante inválido!'
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <InputMask
                      mask="99.999.999/9999-99"
                      value={form.document}
                      onChange={handleChange}
                    >
                      {() => (
                        <TextField
                          name="document"
                          label="CNPJ"
                          variant="outlined"
                          className={classes.card_input}
                          error={!valid.document && submitted}
                          helperText={
                            !valid.document && submitted && 'CNPJ inválido!'
                          }
                        />
                      )}
                    </InputMask>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
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

                  <Grid container item justify="center" xs={12} sm={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        className={classes.card_input}
                        ampm={false}
                        margin="normal"
                        label="Hora de Abertura"
                        value={form.hourStart}
                        onChange={handleHourStart}
                        inputVariant="outlined"
                        invalidDateMessage="Hora Inválida"
                        emptyLabel={
                          !valid.hourStart && submitted && 'Hora Inválida!'
                        }
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        className={classes.card_input}
                        ampm={false}
                        margin="normal"
                        label="Hora de Fechamento"
                        value={form.hourEnd}
                        onChange={handleHourEnd}
                        inputVariant="outlined"
                        invalidDateMessage="Hora Inválida"
                        emptyLabel={
                          !valid.hourEnd && submitted && 'Hora Inválida!'
                        }
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <TextField
                      name="logo"
                      label="URL da Logo"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.logo}
                      error={!valid.logo && submitted}
                      onChange={handleChange}
                      helperText={
                        (!valid.email && submitted && 'Email inválido!') ||
                        (error === 422 && 'Email já cadastrado!')
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12}>
                    <span className={classes.card_title}>
                      Endereço do Restaurante
                    </span>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <InputMask
                      mask="99999-999"
                      value={form.postalCode}
                      onChange={handleChange}
                    >
                      {() => (
                        <TextField
                          name="postalCode"
                          label="CEP"
                          variant="outlined"
                          className={classes.card_input}
                          error={!valid.postalCode && submitted}
                          helperText={
                            !valid.postalCode && submitted && 'CEP inválido!'
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleAddress}>
                                  <SearchOutlined />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </InputMask>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <Autocomplete
                      options={states?.map(state => state.sigla) || []}
                      autoHighlight
                      className={classes.card_select}
                      noOptionsText="Nenhum estado encontrado"
                      getOptionLabel={option => option}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderOption={option => (
                        <React.Fragment>{option}</React.Fragment>
                      )}
                      value={form.state}
                      onChange={handleState}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Selecione um Estado"
                          variant="outlined"
                          error={!valid.state && submitted}
                          helperText={
                            !valid.state && submitted && 'Estado inválido!'
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <Autocomplete
                      options={cities?.map(city => city.nome) || []}
                      autoHighlight
                      className={classes.card_select}
                      noOptionsText="Nenhuma cidade encontrada"
                      getOptionLabel={option => option}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderOption={option => (
                        <React.Fragment>{option}</React.Fragment>
                      )}
                      value={form.city}
                      onChange={handleCity}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Selecione uma Cidade"
                          variant="outlined"
                          error={!valid.city && submitted}
                          helperText={
                            !valid.city && submitted && 'Cidade inválida!'
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <TextField
                      name="neighborhood"
                      label="Bairro"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.neighborhood}
                      error={!valid.neighborhood && submitted}
                      onChange={handleChange}
                      helperText={
                        !valid.neighborhood && submitted && 'Bairro inválido!'
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={10}>
                    <TextField
                      name="streetName"
                      label="Endereço do Restaurante"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.streetName}
                      error={!valid.streetName && submitted}
                      onChange={handleChange}
                      helperText={
                        !valid.streetName && submitted && 'Rua inválida!'
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={2}>
                    <TextField
                      name="streetNumber"
                      label="Número"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.streetNumber}
                      error={!valid.streetNumber && submitted}
                      onChange={handleChange}
                      helperText={
                        !valid.streetNumber && submitted && 'Número inválido!'
                      }
                    />
                  </Grid>
                  {/*
                  country
                  state
                  city
                  neighborhood
                  streetName
                  streetNumber */}
                </Grid>
              </CardContent>

              <CardActions className={classes.card_actions}>
                <Grid container item justify="center" xs={12} sm={9}>
                  <Button
                    type="submit"
                    size="large"
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    className={classes.card_actions__button}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      'Enviar'
                    )}
                  </Button>
                </Grid>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
