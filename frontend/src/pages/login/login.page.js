import React from 'react';

import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';

import logo from '../../assets/icons/logo.webp';

import './login.page.scss';

const LoginPage = () => {
  return (
    <div className="container">
      <Grid container className="container_body">
        <Grid item xs={12} sm={5}>
          <Card className="container_body--card">
            <CardContent className="container_body--card_content">
              <Grid item className="container_body--card_header">
                <img
                  src={logo}
                  alt="logotipo ifood"
                  className="container_body--card_header--logo"
                />
              </Grid>

              <Grid container item justify="center">
                <span className="container_body--card_content--title">
                  Falta pouco para matar sua fome!
                </span>

                <span className="container_body--card_content--subtitle">
                  Digite seu email para continuar
                </span>

                <Grid container item justify="center" xs={12} sm={9}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    className="container_body--card_content--input"
                  />
                </Grid>
              </Grid>
            </CardContent>

            <CardActions className="container_body--card_actions">
              <Grid container item justify="center">
                <Grid container item justify="center" xs={12} sm={9}>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    className="container_body--card_actions--button"
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
