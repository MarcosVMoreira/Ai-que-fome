import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Slide,
  withWidth,
} from '@material-ui/core';
import {
  BookmarkBorderRounded,
  CloseRounded,
  MoreVertRounded,
  Search,
} from '@material-ui/icons';

import * as actions from '../../store/actions/index';
import classes from './AddressModal.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddressModal = withWidth()(props => {
  const [searchAddress, setSearchAddress] = useState('');
  const [addressError, setAddressError] = useState({ show: false, ended: 0 });
  const [menuAnchor, setMenuAnchor] = useState(null);

  const addresses = useSelector(state => state.customer.addresses);
  const error = useSelector(state => state.customer.error);
  const loading = useSelector(state => state.customer.loading);

  const dispatch = useDispatch();
  const onCustomerAddress = useCallback(
    () => dispatch(actions.customerAddress()),
    [dispatch],
  );

  useEffect(() => {
    setAddressError({ show: false, ended: 0 });
    onCustomerAddress();
  }, [props.address, onCustomerAddress]);

  const handleSearchAddress = event => setSearchAddress(event.target.value);

  const handleExit = () => {
    setAddressError(false);

    if (!props.address) {
      setAddressError({ show: true, ended: 1 });
    } else {
      props.handleModal(false);
    }
  };

  const handleOpenMenu = event => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  let userAddressError;
  error === 401 &&
    (userAddressError = (
      <div className={classes.modal_subtitle}>
        Erro ao obter os endereços, tente novamente mais tarde
      </div>
    ));

  addressError.show &&
    (userAddressError = (
      <div
        className={classes.modal_subtitle}
        shake={addressError.ended}
        onAnimationEnd={() => setAddressError({ show: true, ended: 0 })}
      >
        Defina ao menos um endereço de entrega!
      </div>
    ));

  return (
    <Dialog
      open={props.modal}
      onClose={() => props.handleModal(false)}
      TransitionComponent={Transition}
      disableBackdropClick={props.address ? false : true}
      disableEscapeKeyDown={props.address ? false : true}
      onBackdropClick={handleExit}
      onEscapeKeyDown={handleExit}
      fullWidth
      fullScreen={props.width === 'xs'}
      maxWidth={'sm'}
    >
      <Hidden smUp>
        <Grid container justify="flex-start">
          <IconButton onClick={handleExit}>
            <CloseRounded />
          </IconButton>
        </Grid>
      </Hidden>

      <Grid container justify="center" item sm={12}>
        <div className={classes.modal_title}>
          Onde você quer receber seu pedido?
        </div>
      </Grid>
      <Grid container justify="center" item sm={12}>
        {userAddressError}
      </Grid>

      <DialogContent>
        <InputBase
          className={classes.modal_input}
          name="search"
          placeholder="Buscar endereço"
          value={searchAddress}
          onChange={handleSearchAddress}
          startAdornment={<Search className={classes.modal_input__icon} />}
        />

        {loading ? (
          <Grid container justify="center">
            <Box mx="auto" mb={2}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : (
          addresses.map((address, index) => (
            <Card
              key={index}
              variant="outlined"
              className={`${classes.modal_card} ${
                props.address?.streetName === address.streetName &&
                classes.modal_card__selected
              }`}
            >
              <CardActionArea onClick={() => props.handleAddress(address)}>
                <CardContent className={classes.modal_actions}>
                  <Grid container alignItems="center">
                    <Grid item xs={2} sm={1}>
                      <BookmarkBorderRounded />
                    </Grid>

                    <Grid item xs={10} sm={11} container direction="column">
                      <Grid>
                        <span className={classes.modal_card__title}>
                          {address.streetName}, {address.streetNumber}
                        </span>
                      </Grid>
                      <Grid>
                        <span className={classes.modal_card__subtitle}>
                          {address.complement ? `${address.complement},` : ''}
                          {address.neighborhood}, {address.city} -{' '}
                          {address.district}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>

              <IconButton onClick={handleOpenMenu}>
                <MoreVertRounded />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                keepMounted
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => props.handleEditAddress(index)}>
                  Editar
                </MenuItem>

                <MenuItem onClick={() => props.handleRemoveAddress(index)}>
                  Excluir
                </MenuItem>
              </Menu>
            </Card>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
});
