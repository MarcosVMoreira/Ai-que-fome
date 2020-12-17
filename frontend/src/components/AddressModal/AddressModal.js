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
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { geocodeByPlaceId } from 'react-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import { AddressCard } from '../AddressCard/AddressCard';
import { AddressForm } from '../AddressForm/AddressForm';
import { AddressSearch } from '../AddressSearch/AddressSearch';
import { Spinner } from '../UI/Spinner/Spinner';
import classes from './AddressModal.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddressModal = withWidth()(props => {
  /* React State Hooks */
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

  /* Redux Selectors */
  const customer = useSelector(state => state.customer.customer) || [];
  const error = useSelector(state => state.customer.error);
  const loading = useSelector(state => state.customer.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onCustomerData = useCallback(() => dispatch(actions.customerData()), [
    dispatch,
  ]);
  const onRemoveCustomerAddress = addressId =>
    dispatch(actions.customerRemoveAddress(addressId));

  /* Functions */
  // Loads user data (and it's addresses) each time the modal is opened
  useEffect(() => {
    onCustomerData();
  }, [onCustomerData]);

  // Resets errors and search each time the user selects an address
  useEffect(() => {
    setSearchAddress({ value: '', submitted: false });
    setUserAddressError({ show: false, ended: 0, message: null });
  }, [props.address]);

  // Sets address to search and resets errors (so they can be reassessed)
  const handleSearchAddress = address => {
    setUserAddressError({ show: false, ended: 0, message: null });
    setSearchAddress({ value: address, submitted: false });
  };

  // Remove the selected address
  const handleRemoveAddress = addressId => {
    onRemoveCustomerAddress(addressId);
  };

  // Edit the selected address
  const handleEditAddress = address => {
    setEditAddress(address);
    handleSearchAddress(address.streetName);
  };

  // Get selected address information
  const handleSelect = (address, placeId) => {
    geocodeByPlaceId(placeId).then(res =>
      setSearchAddress({ value: res[0], submitted: true }),
    );
  };

  // On modal close we verify if the user has ate least one selected address,
  // if there isn't show an error, otherwise, closes the modal
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

  // Resets the address search value
  const handleReset = () => {
    setSearchAddress({ value: '', submitted: false });
  };

  // Error handling
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

  // If perhaps we can't find this user in db
  error === 404 &&
    (errorBlock = (
      <div className={classes.modal_subtitle}>
        Erro ao obter os endereços, tente novamente mais tarde
      </div>
    ));

  // Shake error animation
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

  // We show the user it's addresses until he searches something, then we show
  // the results, then, if he clicks on any result we redirect him to new address form
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
          customer.addresses &&
          customer.addresses.map(address => (
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
