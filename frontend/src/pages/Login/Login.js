import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';

import logo from '../../assets/icons/logo.webp';

import classes from './Login.module.scss';
import { validateEmail } from '../../helpers/validation';
import * as actions from '../../store/actions/index';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [invalidMail, setInvalidMail] = useState(false);

  const dispatch = useDispatch();
  const onAuthEmail = email => dispatch(actions.authEmail({ email: email }));

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setInvalidMail(true);
    } else {
      debugger;
      dispatch(onAuthEmail(email));
    }
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.container_body}>
        <Grid item xs={12} sm={5}>
          <Card className={classes.card}>
            <form name="form" onSubmit={handleSubmit}>
              <CardContent>
                <Grid item className={classes.card_header}>
                  <img
                    src={logo}
                    alt="logotipo ifood"
                    className={classes.card_header__logo}
                  />
                </Grid>

                <Grid container item justify="center">
                  <span className={classes.card_title}>
                    Falta pouco para matar sua fome!
                  </span>

                  <span className={classes.card_subtitle}>
                    Digite seu email para continuar
                  </span>

                  <Grid container item justify="center" xs={12} sm={9}>
                    <TextField
                      onFocus={() => setInvalidMail(false)}
                      error={invalidMail}
                      name="email"
                      label="Email"
                      value={email}
                      onChange={handleEmail}
                      variant="outlined"
                      className={classes.card_input}
                      helperText={invalidMail && 'Email inválido!'}
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions className={classes.card_actions}>
                <Grid container item justify="center">
                  <Grid container item justify="center" xs={12} sm={9}>
                    <Button
                      type="submit"
                      size="large"
                      color="primary"
                      variant="contained"
                      className={classes.card_actions__button}
                    >
                      Entrar
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
