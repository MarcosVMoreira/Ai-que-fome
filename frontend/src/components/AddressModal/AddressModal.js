import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  DialogContent,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Slide,
  withWidth,
} from '@material-ui/core';
import {
  BookmarkBorderRounded,
  CloseRounded,
  LocationOn,
  Search,
} from '@material-ui/icons';

import PlacesAutocomplete from 'react-places-autocomplete';

import * as actions from '../../store/actions/index';
import classes from './AddressModal.module.scss';
import { AddressCard } from '../UI/Card/Card';
import { Spinner } from '../UI/Spinner/Spinner';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddressModal = withWidth()(props => {
  const [searchAddress, setSearchAddress] = useState('');
  const [userAddressError, setUserAddressError] = useState({
    show: false,
    ended: 0,
  });

  const userAddresses = useSelector(state => state.customer.addresses);
  const error = useSelector(state => state.customer.error);
  const loading = useSelector(state => state.customer.loading);

  const dispatch = useDispatch();
  const onCustomerAddress = useCallback(
    () => dispatch(actions.customerAddress()),
    [dispatch],
  );

  useEffect(() => {
    setSearchAddress('');
    setUserAddressError({ show: false, ended: 0 });
    onCustomerAddress();
  }, [props.address, onCustomerAddress]);

  const handleSearchAddress = address => {
    setSearchAddress(address);
  };

  const handleSelect = address => {
    console.log(address);
  };

  const handleExit = () => {
    setSearchAddress('');
    setUserAddressError(false);

    if (!props.address) {
      setUserAddressError({ show: true, ended: 1 });
    } else {
      props.handleModal(false);
    }
  };

  const handleNewAddress = () => {};

  let errorBlock;
  error === 401 &&
    (errorBlock = (
      <div className={classes.modal_subtitle}>
        Erro ao obter os endereços, tente novamente mais tarde
      </div>
    ));

  userAddressError.show &&
    (errorBlock = (
      <div
        className={classes.modal_subtitle}
        shake={userAddressError.ended}
        onAnimationEnd={() => setUserAddressError({ show: true, ended: 0 })}
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
      className={classes.modal}
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
        {errorBlock}
      </Grid>

      <DialogContent>
        <PlacesAutocomplete
          value={searchAddress}
          onChange={handleSearchAddress}
          onSelect={handleSelect}
          debounce={1000}
          searchOptions={{
            // eslint-disable-next-line
            location: new google.maps.LatLng(-21, -46),
            radius: 2000,
            types: ['address'],
          }}
        >
          {({ getInputProps, suggestions, loading }) => (
            <Fragment>
              <InputBase
                name="search"
                startAdornment={
                  <Search className={classes.modal_input__icon} />
                }
                {...getInputProps({
                  placeholder: 'Buscar endereço',
                  className: `${classes.modal_input}`,
                })}
              />

              {loading ? (
                <Spinner />
              ) : (
                suggestions.map(({ formattedSuggestion, placeId }) => {
                  const main = formattedSuggestion.mainText.split(',');
                  const secondary = formattedSuggestion.secondaryText.split(
                    /[/,,-]+/,
                  );

                  return (
                    <Fragment key={placeId}>
                      <AddressCard
                        address={{
                          streetName: main[0].trim(),
                          streetNumber: main[1]?.trim(),
                          neighborhood: secondary[0].trim(),
                          city: secondary[1]?.trim(),
                          district: secondary[2]?.trim(),
                        }}
                        handleClick={handleNewAddress}
                        menu={false}
                      >
                        <LocationOn />
                      </AddressCard>
                    </Fragment>
                  );
                })
              )}
            </Fragment>
          )}
        </PlacesAutocomplete>

        {!searchAddress &&
          (loading ? (
            <Spinner />
          ) : (
            userAddresses.map((address, index) => (
              <Fragment key={index}>
                <AddressCard
                  address={address}
                  handleClick={() => props.handleAddress(address)}
                  menu={true}
                  selected={props.address}
                >
                  <BookmarkBorderRounded />
                </AddressCard>
              </Fragment>
            ))
          ))}
      </DialogContent>
    </Dialog>
  );
});
