import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  DialogContent,
  Grid,
  Hidden,
  IconButton,
  Slide,
  withWidth,
} from '@material-ui/core';
import {
  BookmarkBorderRounded,
  CloseRounded,
  KeyboardArrowLeftRounded,
} from '@material-ui/icons';

import * as actions from '../../store/actions/index';
import classes from './AddressModal.module.scss';
import { Spinner } from '../UI/Spinner/Spinner';
import { AddressCard } from '../AddressCard/AddressCard';
import { AddressSearch } from '../AddressSearch/AddressSearch';
import { AddressForm } from '../AddressForm/AddressForm';
import { geocodeByPlaceId } from 'react-places-autocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddressModal = withWidth()(props => {
  const [searchAddress, setSearchAddress] = useState({
    value: '',
    submitted: false,
  });
  const [userAddressError, setUserAddressError] = useState({
    show: false,
    ended: 0,
    message: null,
  });

  const [editAddress, setEditAddress] = useState(null);

  let errorBlock;

  const userAddresses = useSelector(state => state.customer.addresses);
  const error = useSelector(state => state.customer.error);
  const loading = useSelector(state => state.customer.loading);

  const dispatch = useDispatch();
  const onCustomerAddress = useCallback(
    () => dispatch(actions.customerAddress()),
    [dispatch],
  );
  const onRemoveCustomerAddress = addressId =>
    dispatch(actions.customerRemoveAddress(addressId));

  useEffect(() => {
    setSearchAddress({ value: '', submitted: false });
    setUserAddressError({ show: false, ended: 0, message: null });
    onCustomerAddress();
  }, [props.address, onCustomerAddress]);

  const handleSearchAddress = address => {
    setUserAddressError({ show: false, ended: 0, message: null });
    setSearchAddress({ value: address, submitted: false });
  };

  const handleRemoveAddress = idAddress => {
    onRemoveCustomerAddress(idAddress);
  };

  const handleEditAddress = address => {
    setEditAddress(address);
    handleSearchAddress(address.streetName);
  };

  const handleSelect = (address, placeId) => {
    geocodeByPlaceId(placeId).then(res =>
      setSearchAddress({ value: res[0], submitted: true }),
    );
  };

  const handleExit = () => {
    setSearchAddress({ value: '', submitted: false });
    setUserAddressError(false);

    if (!props.address) {
      setUserAddressError({
        show: true,
        ended: 1,
        message: 'Defina ao menos um endereço de entrega!',
      });
    } else {
      props.handleModal(false);
    }
  };

  const handleReset = () => {
    setSearchAddress({ value: '', submitted: false });
  };

  const handleError = status => {
    switch (status) {
      case 'ZERO_RESULTS':
        setUserAddressError({
          show: true,
          ended: 1,
          message: 'Nenhum endereço encontrado.',
        });
        break;
      default:
        break;
    }
  };

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
        onAnimationEnd={() =>
          setUserAddressError({ ...userAddressError, show: true, ended: 0 })
        }
      >
        {userAddressError.message}
      </div>
    ));

  let contentBlock;
  !searchAddress.value &&
    !searchAddress.submitted &&
    (contentBlock = (
      <Fragment>
        <AddressSearch
          searchAddress={searchAddress.value}
          handleSearchAddress={handleSearchAddress}
          handleSelect={handleSelect}
          handleError={handleError}
        />
        {loading ? (
          <Spinner />
        ) : (
          userAddresses.map(address => (
            <div className={classes.modal_addresses} key={address.id}>
              <AddressCard
                address={address}
                handleClick={() => props.handleAddress(address)}
                menu={true}
                selected={props.address}
                handleEditAddress={id => handleEditAddress(id)}
                handleRemoveAddress={id => handleRemoveAddress(id)}
              >
                <BookmarkBorderRounded />
              </AddressCard>
            </div>
          ))
        )}
      </Fragment>
    ));

  searchAddress.value &&
    !searchAddress.submitted &&
    (contentBlock = (
      <AddressSearch
        searchAddress={searchAddress.value}
        handleSearchAddress={handleSearchAddress}
        handleSelect={handleSelect}
        handleError={handleError}
      />
    ));

  searchAddress.value &&
    searchAddress.submitted &&
    (contentBlock = (
      <AddressForm
        address={searchAddress.value}
        handleClick={() => setSearchAddress({ value: '', submitted: false })}
        editAddressId={editAddress?.id}
      />
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
      <Grid container alignItems="center" className={classes.modal}>
        <Grid item xs>
          {searchAddress.submitted && (
            <IconButton onClick={handleReset}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          )}
        </Grid>

        <Grid item xs={8} className={classes.modal_title}>
          Onde você quer receber seu pedido?
        </Grid>

        <Grid item xs>
          <Hidden smUp>
            <IconButton onClick={handleExit}>
              <CloseRounded />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>

      <Grid container justify="center" item sm={12}>
        {errorBlock}
      </Grid>

      <DialogContent>{contentBlock}</DialogContent>
    </Dialog>
  );
});
