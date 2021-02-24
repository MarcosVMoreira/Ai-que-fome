import { Divider, Grid } from '@material-ui/core';
import React from 'react';
import { categories, payments } from '../../../helpers/enums';
import classes from './RestaurantInfo.module.scss';

export const RestaurantInfo = ({ restaurant }) => {
  return (
    <Grid container direction="column" item xs className={classes.container}>
      <Grid item xs container className={classes.container_more}>
        <span>{categories[restaurant.merchantType[0]]}</span>
        <span> • </span>
        <span>{restaurant.duration} min</span>
        <span> • </span>
        <span>{restaurant.distance.toFixed(1).replace('.', ',')} km</span>
        <span> • </span>
        {restaurant.fee !== 0.0 ? (
          <span>R$ {restaurant.fee.toFixed(2).replace('.', ',')}</span>
        ) : (
          <span>Entrega Grátis</span>
        )}
      </Grid>

      <Divider light />

      <Grid item xs className={classes.container_description}>
        <span>{restaurant.description}</span>
      </Grid>

      <Divider light />

      <Grid
        item
        xs
        container
        direction="column"
        className={classes.container_business}
      >
        <span>Horário de Funcionamento</span>
        <span>
          Todos os dias das {restaurant.businessStart} às{' '}
          {restaurant.businessEnd}
        </span>
      </Grid>

      <Divider light />

      <Grid
        item
        xs
        container
        direction="column"
        className={classes.container_business}
      >
        <span>Meios de Pagamento Aceitos</span>

        {restaurant.allowedPayments.map(el => (
          <span key={el}>{payments[el]}</span>
        ))}
      </Grid>

      <Divider light />

      <Grid
        item
        xs
        container
        direction="column"
        className={classes.container_business}
      >
        <span>Dados do Restaurante</span>

        <span>
          {restaurant.streetName}, {restaurant.streetNumber},{' '}
          {restaurant.neighborhood} - {restaurant.city}, {restaurant.state} -{' '}
          {restaurant.postalCode}
        </span>

        <span>
          CNPJ:{' '}
          {restaurant.document.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
            '$1.$2.$3/$4-$5',
          )}
        </span>
      </Grid>

      <Divider light />
    </Grid>
  );
};
