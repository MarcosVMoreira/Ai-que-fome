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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Logo } from '../../../components/UI/Logo/Logo';
import { Toast } from '../../../components/UI/Toast/Toast';
import { validateEmail, validatePassword } from '../../../helpers/validation';
import * as actions from '../../../store/actions/index';
import classes from './Login.module.scss';

export const Login = props => {
  /* React State Hooks */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [invalidField, setInvalidField] = useState(false);

  /* Redux Selectors */
  const registered = useSelector(state => state.auth.registered);
  const authenticated = useSelector(state => state.auth.authenticated);
  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);
  const success = useSelector(state => state.signUp.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onAuthEmail = email => {
    return dispatch(actions.authEmail({ email: email }));
  };
  const onAuthPassword = (email, password) => {
    return dispatch(
      actions.authPassword({
        email: email,
        password: password,
        type: 'customer',
      }),
    );
  };
  const onReset = () => {
    return dispatch(actions.authReset());
  };
  const onSignUpReset = () => {
    return dispatch(actions.signUpReset());
  };
  const onErrorReset = () => {
    return dispatch(actions.errorReset());
  };

  /* Functions */
  // Changes the "email" state value when user types
  const handleEmail = event => {
    setEmail(event.target.value);
  };

  // Changes the "password" state value when user types
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  // Resets to Initial State
  const handleReset = () => {
    setEmail('');
    setPassword('');
    setPasswordVisible(false);
    setInvalidField(false);
    onReset();
  };

  // Handle the button "Entrar" click
  const handleSubmit = event => {
    // Prevents the page to reload (submit default action)
    event.preventDefault();

    // If registered is false then no email has been entered yet, therefore, it must be the email submit
    // Otherwise, the user already entered a valid email, which was verified as registered, therefore, it must be the password submit
    if (!registered) {
      validateEmail(email) ? onAuthEmail(email) : setInvalidField(true);
    } else {
      validatePassword(password)
        ? onAuthPassword(email, password)
        : setInvalidField(true);
    }
  };

  // Closes the toast after a successful signup
  const handleToastClose = () => {
    onSignUpReset();
  };

  // We have to set error to null to avoid infinite re-renders
  const handleWrongPassword = () => {
    onErrorReset();
    setInvalidField(true);
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

  const handleConsumer = () => {
    props.history.push('/login');
  };

  // If registered is false then no email has been entered yet, therefore, show email for login
  // Otherwise, show password for login (it means the user has entered a registered mail)
  let form;
  registered
    ? (form = (
        <Fragment>
          <span className={classes.card_subtitle}>
            Digite o código recebido no seu email
          </span>

          <Grid container item justify="center" xs={12} sm={9}>
            <TextField
              name="password"
              label="Senha"
              variant="outlined"
              className={classes.card_input}
              value={password}
              error={invalidField}
              onChange={handlePassword}
              onFocus={() => setInvalidField(false)}
              helperText={invalidField && 'Senha inválida!'}
              type={passwordVisible ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Fragment>
      ))
    : (form = (
        <Fragment>
          <span className={classes.card_subtitle}>
            Digite seu email para continuar
          </span>

          <Grid container item justify="center" xs={12} sm={9}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              className={classes.card_input}
              value={email}
              error={invalidField}
              onChange={handleEmail}
              onFocus={() => setInvalidField(false)}
              helperText={invalidField && 'Email inválido!'}
            />
          </Grid>
        </Fragment>
      ));

  let redirect;
  let toast;
  // If we get a 401 error, it means the password entered by the user is incorrect
  error === 401 && handleWrongPassword();
  // If we get a 403 error, it means the user is trying to access something it doesn't have access
  error === 403 &&
    (toast = setToast(
      'Erro de permissão, contate um administrador caso continue vendo este erro!',
    ));
  // If we get a 404 error, it means the user doesn't have an account, redirect to signup!
  error === 404 && (redirect = <Redirect to="/signup" />);
  // If we get a 422 error, it means the user sent an incompatible format to the server
  error === 422 &&
    (toast = setToast(
      'Erro de processamento, por favor contate um administrador!',
    ));
  // If we get 500, 503 or 504 redirects the user to not found page
  (error === 500 || error === 503 || error === 504) &&
    (redirect = <Redirect to="/not-found" />);
  // If user is authenticated redirects to home!
  authenticated && (redirect = <Redirect to="/home" />);

  success &&
    (toast = (
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleToastClose}
      >
        <Toast onClose={handleToastClose} severity="success">
          Cadastrado com sucesso!
        </Toast>
      </Snackbar>
    ));

  return (
    <div className={classes.container}>
      {redirect}
      {toast}

      <Grid container className={classes.container_body}>
        <Grid container justify="center" item xs={12} sm={5}>
          <Card className={classes.card}>
            <form name="form" onSubmit={handleSubmit}>
              <CardContent>
                <Logo handleClick={handleReset} merchant />

                <Grid container item justify="center">
                  <span className={classes.card_title}>
                    Falta pouco para alavancar seu negócio!
                  </span>

                  {form}
                </Grid>
              </CardContent>

              <CardActions className={classes.card_actions}>
                <Grid container justify="center">
                  <Grid container item justify="center" xs={12} sm={9}>
                    <Button
                      type="submit"
                      size="large"
                      color="primary"
                      variant="contained"
                      disabled={loading || error === 403 || error === 422}
                      className={classes.card_actions__button}
                    >
                      {loading ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        'Entrar'
                      )}
                    </Button>
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <Button
                      type="button"
                      color="primary"
                      onClick={handleConsumer}
                    >
                      Consumidor? Clique aqui
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
