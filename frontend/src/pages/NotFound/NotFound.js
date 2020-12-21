import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Logo } from '../../components/UI/Logo/Logo';
import * as actions from '../../store/actions/index';
import classes from './NotFound.module.scss';

export const NotFound = props => {
  const dispatch = useDispatch();
  const onErrorReset = () => dispatch(actions.errorReset());

  // On Logo click redirect to login page
  const handleReset = () => {
    onErrorReset();
    props.history.push('/customer/login');
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.container_body}>
        <Grid item xs={12} sm={5}>
          <Card className={classes.card}>
            <CardContent>
              <Logo handleClick={handleReset} />

              <Grid container item justify="center">
                <span className={classes.card_title}>
                  Sua fome foi parar em locais desconhecidos!
                </span>
              </Grid>
            </CardContent>

            <CardActions className={classes.card_actions}>
              <Grid container item justify="center" xs={12}>
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.card_actions__button}
                  onClick={handleReset}
                >
                  Voltar para Página Inicial
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
