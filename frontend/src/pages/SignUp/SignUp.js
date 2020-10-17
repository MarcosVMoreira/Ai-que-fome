import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import InputMask from 'react-input-mask';

import classes from './SignUp.module.scss';
import {
  validateEmail,
  validateDocument,
  validatePhone,
  validateName,
} from '../../helpers/validation';
import * as actions from '../../store/actions/index';
import { Logo } from '../../components/UI/Logo/Logo';
import { Redirect } from 'react-router-dom';

export const SignUp = props => {
  /* Redux Selectors */
  const signUpMail = useSelector(state => state.auth.signUpMail);
  const error = useSelector(state => state.signUp.error);
  const loading = useSelector(state => state.signUp.loading);
  const success = useSelector(state => state.signUp.success);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onSignUp = form => {
    return dispatch(actions.signUp(form));
  };
  const onErrorReset = () => {
    return dispatch(actions.errorReset());
  };

  /* React State Hooks (if the user tried to Login using a non-existing mail
    we initialize the form with the attempted mail) */
  const [form, setForm] = useState({
    email: signUpMail || '',
    name: '',
    phone: '',
    document: '',
  });
  const [valid, setValid] = useState({
    email: true,
    name: true,
    phone: true,
    document: true,
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
      document: validateDocument(form.document),
    });
  }, [form]);

  // On Logo click redirect to login page
  const handleReset = () => {
    onErrorReset();
    props.history.push('/login');
  };

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to register the new user
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      onSignUp(form);
  };

  // If register was successful redirects to home!
  let redirect;
  redirect = success && <Redirect to="/login" />;

  return (
    <div className={classes.container}>
      {redirect}

      <Grid container className={classes.container_body}>
        <Grid item xs={12} sm={5} className={classes.container_body__wrapper}>
          <Card className={classes.card}>
            <form name="form" onSubmit={handleSubmit}>
              <CardContent>
                <Logo handleReset={handleReset} />

                <Grid container item justify="center">
                  <span className={classes.card_title}>
                    Cadastre-se para acessar
                  </span>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      className={classes.card_input}
                      value={form.email}
                      error={(!valid.email && submitted) || (error && true)}
                      onChange={handleChange}
                      helperText={
                        (!valid.email && submitted && 'Email inválido!') ||
                        (error && 'Email já cadastrado!')
                      }
                    />
                  </Grid>

                  <Grid container item justify="center" xs={12} sm={9}>
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

                  <Grid container item justify="center" xs={12} sm={9}>
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

                  <Grid container item justify="center" xs={12} sm={9}>
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
