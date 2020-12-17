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
import React, { Fragment, useState } from 'react';
import classes from './AddressCard.module.scss';

export const AddressCard = props => {
  /* React State Hooks */
  const [menuAnchor, setMenuAnchor] = useState(null);

  /* Functions */
  // Opens the options menu (edit, remove) from the address
  const handleOpenMenu = event => {
    setMenuAnchor(event.currentTarget);
  };

  // Closes the options menu from the address
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Card
      variant="outlined"
      // If the Card is the selected one we outline it with a red line
      className={`${classes.card} ${
        props.selected &&
        props.selected?.id === props.address.id &&
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
            <MenuItem
              disabled={props.selected?.id === props.address?.id}
              onClick={() => props.handleEditAddress(props.address)}
            >
              Editar
            </MenuItem>

            <MenuItem
              disabled={props.selected?.id === props.address?.id}
              onClick={() => props.handleRemoveAddress(props.address.id)}
            >
              Excluir
            </MenuItem>
          </Menu>
        </Fragment>
      )}
    </Card>
  );
};
