import React, { Fragment, useState } from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { MoreVertRounded } from '@material-ui/icons';

import classes from './Card.module.scss';

export const AddressCard = props => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleOpenMenu = event => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Card
      variant="outlined"
      className={`${classes.card} ${
        props.selected?.streetName === props.address?.streetName &&
        classes.card_selected
      }`}
    >
      <CardActionArea onClick={props.handleClick}>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={2} sm={1}>
              {props.children}
            </Grid>

            <Grid item xs={10} sm={11} container direction="column">
              <Grid>
                <span className={classes.card_title}>
                  {props.address.streetName}
                  {props.address.streetNumber && ', '}
                  {props.address.streetNumber}
                </span>
              </Grid>
              <Grid>
                <span className={classes.modal_subtitle}>
                  {props.address.neighborhood}, {props.address.city} -{' '}
                  {props.address.district}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>

      {props.menu && (
        <Fragment>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertRounded />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => props.handleEditAddress(props.index)}>
              Editar
            </MenuItem>

            <MenuItem onClick={() => props.handleRemoveAddress(props.index)}>
              Excluir
            </MenuItem>
          </Menu>
        </Fragment>
      )}
    </Card>
  );
};
