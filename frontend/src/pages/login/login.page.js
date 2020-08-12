import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import MailIcon from '@material-ui/icons/Mail';

import logo from '../../assets/icons/logo.png';

import './login.page.scss';

const LoginPage = () => {
  return (
    <div className="container">
      <Grid container justify="center">
        <Grid item sm={12} className="container_header">
          <img src={logo} className="container_header--logo" />
        </Grid>

        <Grid container justify="space-around" alignItems="center" spacing={3}>
          <Grid item>Imagem!a</Grid>

          <Grid item>
            <Card className="container_body--card">
              <CardContent className="container_body--card_content">
                <Typography variant="h4" color="textPrimary" align="center">
                  Falta pouco para matar sua fome!
                </Typography>

                <Typography variant="h5" color="textSecondary" align="center">
                  Como deseja continuar?
                </Typography>
              </CardContent>

              <CardActions className="container_body--card_actions">
                <Grid container justify="center">
                  <Grid xs={12} sm={8}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      className="container_body--card_actions--button"
                    >
                      Continuar com Facebook
                    </Button>
                  </Grid>
                  <Grid xs={12} sm={8}>
                    <Button
                      size="large"
                      variant="contained"
                      fullWidth
                      startIcon={<MailIcon />}
                      className="container_body--card_actions--button"
                    >
                      Email
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
