import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputBase,
  Slide,
} from '@material-ui/core';
import { CloseIcon } from '@material-ui/data-grid';
import { Search } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import empty_restaurants from '../../../assets/icons/empty_restaurants.svg';
import * as actions from '../../../store/actions/index';
import { Spinner } from '../../Shared/Spinner/Spinner';
import { RestaurantCard } from '../RestaurantCard/RestaurantCard';
import classes from './SearchModal.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SearchModal = withRouter(props => {
  const [search, setSearch] = useState('');

  /* Redux Selectors */
  const restaurants = useSelector(state => state.restaurant.restaurants);
  const loading = useSelector(state => state.restaurant.loading);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onFetchRestaurants = payload =>
    dispatch(actions.fetchRestaurants(payload));
  const onFetchRestaurantsFilter = payload =>
    dispatch(actions.fetchRestaurantsFilter(payload));

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const handleFilter = event => {
    if (event.key === 'Enter') {
      const storedAddress = localStorage.getItem('IFOOD_address');

      if (storedAddress) {
        onFetchRestaurantsFilter({
          coordinates: JSON.parse(storedAddress).coordinates,
          name: search,
        });
      }
    }
  };

  const handleResetFilter = () => {
    props.handleModal(false);
    setSearch('');
    const storedAddress = localStorage.getItem('IFOOD_address');

    if (storedAddress) {
      onFetchRestaurants({
        coordinates: JSON.parse(storedAddress).coordinates,
      });
    }
  };

  return (
    <Dialog
      open={props.modal}
      onClose={() => props.handleModal(false)}
      TransitionComponent={Transition}
      fullWidth
      fullScreen
    >
      <Grid container alignItems="center" className={classes.modal}>
        <InputBase
          className={classes.modal_input}
          name="search"
          placeholder="Procurar..."
          value={search}
          onChange={handleSearch}
          onKeyDown={handleFilter}
          startAdornment={<Search className={classes.modal_input__icon} />}
          endAdornment={
            <IconButton size="small" onClick={handleResetFilter}>
              <CloseIcon />
            </IconButton>
          }
        />
      </Grid>

      <DialogContent>
        {loading || !restaurants ? (
          <Spinner />
        ) : (
          <Fragment>
            {restaurants.length ? (
              <Grid container spacing={3}>
                {restaurants.map(res => (
                  <Grid key={res.merchantId} item xs={12} sm={6} lg={4}>
                    <Link to={`restaurant/${res.merchantId}`}>
                      <RestaurantCard {...res} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div className={classes.modal_empty}>
                <img
                  src={empty_restaurants}
                  alt="ilustração de chefe de cozinha"
                />
                <span>Nenhum restaurante encontrado</span>
                <span>Tente pesquisar com outros termos</span>
              </div>
            )}
          </Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
});
