import React, { Fragment } from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';
import { InputBase } from '@material-ui/core';
import { LocationOn, Search } from '@material-ui/icons';

import { AddressCard } from '../AddressCard/AddressCard';
import { Spinner } from '../UI/Spinner/Spinner';

import classes from './AddressSearch.module.scss';

export const AddressSearch = props => {
  return (
    <PlacesAutocomplete
      value={props.searchAddress}
      onChange={props.handleSearchAddress}
      onSelect={props.handleSelect}
      onError={props.handleError}
      ref={c => {
        if (!c) return;
        c.handleInputOnBlur = () => {};
      }}
      debounce={1000}
      searchOptions={{
        // eslint-disable-next-line
        location: new google.maps.LatLng(-21, -46),
        radius: 2000,
        types: ['address'],
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Fragment>
          <InputBase
            name="search"
            startAdornment={
              <Search className={classes.container_input__icon} />
            }
            {...getInputProps({
              placeholder: 'Buscar endereço',
              className: `${classes.container_input}`,
            })}
          />

          {loading ? (
            <Spinner />
          ) : (
            suggestions.map(suggestion => {
              const main = suggestion.formattedSuggestion.mainText.split(',');
              const secondary = suggestion.formattedSuggestion.secondaryText.split(
                /[/,,-]+/,
              );
              const address = {
                streetName: main[0].trim(),
                streetNumber: main[1]?.trim(),
                neighborhood: secondary[0].trim(),
                city: secondary[1]?.trim(),
                district: secondary[2]?.trim(),
              };

              return (
                <div
                  className={classes.container_suggestions}
                  {...getSuggestionItemProps(suggestion)}
                  key={suggestion.placeId}
                >
                  <AddressCard
                    address={{
                      streetName: address.streetName,
                      streetNumber: address.streetNumber,
                      neighborhood: address.neighborhood,
                      city: address.city,
                      district: address.district,
                    }}
                    menu={false}
                  >
                    <LocationOn />
                  </AddressCard>
                </div>
              );
            })
          )}
        </Fragment>
      )}
    </PlacesAutocomplete>
  );
};
