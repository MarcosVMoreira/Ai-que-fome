import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Logo } from '../../../components/UI/Logo/Logo';
import { Toast } from '../../../components/UI/Toast/Toast';
import {
  validateCompanyDocument,
  validateEmail,
  validateName,
  validatePhone,
} from '../../../helpers/validation';
import * as actions from '../../../store/actions/index';
import classes from './SignUp.module.scss';

export const SignUp = props => {
  /* Redux Selectors */
  const signUpMail = useSelector(state => state.auth.signUpMail);
  const error = useSelector(state => state.signUp.error);
  const loading = useSelector(state => state.signUp.loading);
  const success = useSelector(state => state.signUp.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onSignUp = form => dispatch(actions.signUp(form));
  const onErrorReset = () => dispatch(actions.errorReset());
  const onAuthReset = () => dispatch(actions.authReset());

  /* React State Hooks (if the user tried to Login using a non-existing mail
    we initialize the form with the attempted mail) */
  const [form, setForm] = useState({
    email: signUpMail || '',
    name: '',
    phone: '',
    document: '',
    categories: [],
    logo: '',
    postalCode: '',
    country: 'Brasil',
    state: '',
    city: '',
    neighborhood: '',
    streetName: '',
    streetNumber: '',
    availability: true,
  });
  const [valid, setValid] = useState({
    email: true,
    name: true,
    phone: true,
    document: true,
    categories: true,
    logo: true,
    postalCode: true,
    country: true,
    state: true,
    city: true,
    neighborhood: true,
    streetName: true,
    streetNumber: true,
    availability: true,
  });
  const [submitted, setSubmitted] = useState(false);

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      document: validateCompanyDocument(form.document),
      categories: form.categories.length > 0,
      logo: Boolean(form.logo),
      postalCode: Boolean(form.postalCode),
      country: true,
      state: Boolean(form.state),
      city: Boolean(form.city),
      neighborhood: Boolean(form.neighborhood),
      streetName: Boolean(form.streetName),
      streetNumber: Boolean(form.streetNumber),
      availability: true,
    });
  }, [form]);

  const postalCodeSearch = () => {
    // Search postal code on ViaCEP
    console.log('TO DO!!!');
  };

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
      onSignUp(form);
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
  // If register was successful redirects to home!
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

                  <Grid container item justify="center" xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.card_select}
                      error={!valid.categories && submitted}
                    >
                      <InputLabel>Selecione ao menos uma Categoria</InputLabel>
                      <Select
                        multiple
                        value={form.categories}
                        onChange={handleChange}
                        name="categories"
                        label="Selecione ao menos uma Categoria"
                      >
                        <MenuItem value="ten">Ten</MenuItem>
                        <MenuItem value="twenty">Twenty</MenuItem>
                        <MenuItem value="thirty">Thirty</MenuItem>
                      </Select>
                      <FormHelperText>
                        {!valid.categories &&
                          submitted &&
                          'Categoria inválida!'}
                      </FormHelperText>
                    </FormControl>
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
                                <IconButton onClick={postalCodeSearch}>
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
                    <FormControl
                      variant="outlined"
                      className={classes.card_select}
                      error={!valid.state && submitted}
                    >
                      <InputLabel>Selecione um Estado</InputLabel>
                      <Select
                        value={form.state}
                        onChange={handleChange}
                        name="state"
                        label="Selecione um Estado"
                      >
                        <MenuItem value="">
                          <em>Selecione um Estado</em>
                        </MenuItem>
                        <MenuItem value="ten">Ten</MenuItem>
                        <MenuItem value="twenty">Twenty</MenuItem>
                        <MenuItem value="thirty">Thirty</MenuItem>
                      </Select>
                      <FormHelperText>
                        {!valid.state && submitted && 'Estado inválido!'}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.card_select}
                      error={!valid.city && submitted}
                    >
                      <InputLabel>Selecione uma Cidade</InputLabel>
                      <Select
                        value={form.city}
                        onChange={handleChange}
                        name="city"
                        label="Selecione uma Cidade"
                      >
                        <MenuItem value="">
                          <em>Selecione uma Cidade</em>
                        </MenuItem>
                        <MenuItem value="ten">Ten</MenuItem>
                        <MenuItem value="twenty">Twenty</MenuItem>
                        <MenuItem value="thirty">Thirty</MenuItem>
                      </Select>
                      <FormHelperText>
                        {!valid.city && submitted && 'Cidade inválida!'}
                      </FormHelperText>
                    </FormControl>
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