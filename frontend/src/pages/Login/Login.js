import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import classes from './Login.module.scss';
import { validateEmail, validatePassword } from '../../helpers/validation';
import * as actions from '../../store/actions/index';
import { Logo } from '../../components/UI/Logo/Logo';
import { Toast } from '../../components/UI/Toast/Toast';

export const Login = () => {
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
    return dispatch(actions.authPassword({ email: email, password: password }));
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
  // If we get a 404 error, it means the user doesn't have an account, redirect to signup!
  error === 404 && (redirect = <Redirect to="/signup" />);
  // If we get a 401 error, it means the password entered by the user is incorrect
  error === 401 && handleWrongPassword();
  // If user is authenticated redirects to home!
  authenticated && (redirect = <Redirect to="/home" />);

  return (
    <div className={classes.container}>
      {redirect}
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleToastClose}
      >
        <Toast onClose={handleToastClose} severity="success">
          Cadastrado com sucesso!
        </Toast>
      </Snackbar>

      <Grid container className={classes.container_body}>
        <Grid item xs={12} sm={5}>
          <Card className={classes.card}>
            <form name="form" onSubmit={handleSubmit}>
              <CardContent>
                <Logo handleClick={handleReset} />

                <Grid container item justify="center">
                  <span className={classes.card_title}>
                    Falta pouco para matar sua fome!
                  </span>

                  {form}
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
                      'Entrar'
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
