import axios from 'axios';
import { unmask } from '../../helpers/unmask';
import * as actionTypes from './actionTypes';

export const fetchStatesStart = () => ({
  type: actionTypes.FETCH_STATES_START,
});

export const fetchStatesSuccess = payload => ({
  type: actionTypes.FETCH_STATES_SUCCESS,
  payload,
});

export const fetchStatesFail = payload => ({
  type: actionTypes.FETCH_STATES_FAIL,
  payload,
});

export const fetchStates = () => {
  return dispatch => {
    dispatch(fetchStatesStart());

    axios
      .get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      )
      .then(res => {
        dispatch(fetchStatesSuccess({ states: res.data }));
      })
      .catch(err => {
        dispatch(fetchStatesFail({ error: err.response?.status || 500 }));
      });
  };
};

export const fetchCitiesStart = () => ({
  type: actionTypes.FETCH_CITIES_START,
});

export const fetchCitiesSuccess = payload => ({
  type: actionTypes.FETCH_CITIES_SUCCESS,
  payload,
});

export const fetchCitiesFail = payload => ({
  type: actionTypes.FETCH_CITIES_FAIL,
  payload,
});

export const fetchCities = state => {
  return dispatch => {
    dispatch(fetchCitiesStart());

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos?orderBy=nome`,
      )
      .then(res => {
        dispatch(fetchCitiesSuccess({ cities: res.data }));
      })
      .catch(err => {
        dispatch(fetchCitiesFail({ error: err.response?.status || 500 }));
      });
  };
};

export const fetchAddressStart = () => ({
  type: actionTypes.FETCH_ADDRESS_START,
});

export const fetchAddressSuccess = payload => ({
  type: actionTypes.FETCH_ADDRESS_SUCCESS,
  payload,
});

export const fetchAddressFail = payload => ({
  type: actionTypes.FETCH_ADDRESS_FAIL,
  payload,
});

export const fetchAddress = postalCode => {
  return dispatch => {
    dispatch(fetchAddressStart());

    axios
      .get(`https://viacep.com.br/ws/${unmask(postalCode)}/json/`)
      .then(res => {
        if (!res.data.erro) {
          dispatch(fetchAddressSuccess({ address: res.data }));
        } else {
          dispatch(fetchAddressFail({ error: 400 }));
        }
      })
      .catch(err => {
        dispatch(fetchAddressFail({ error: err.response?.status || 500 }));
      });
  };
};

export const locateReset = () => ({
  type: actionTypes.LOCATE_RESET,
});
