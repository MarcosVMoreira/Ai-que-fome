import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { Toast } from '../../../components/Shared/Toast/Toast';
import { unmask } from '../../../helpers/unmask';
import {
  validateCompanyDocument,
  validateEmail,
  validateName,
  validatePhone,
  validatePostalCode,
} from '../../../helpers/validation';
import * as actions from '../../../store/actions/index';
import classes from './Restaurant.module.scss';

export const Restaurant = () => {
  /* Redux Selectors */
  const merchant = useSelector(state => state.merchant.merchant);
  const error = useSelector(state => state.merchant.error);
  const loading = useSelector(state => state.merchant.loading);
  const postalCodeError = useSelector(state => state.locate.error);
  const states = useSelector(state => state.locate.states);
  const cities = useSelector(state => state.locate.cities);
  const address = useSelector(state => state.locate.address);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onMerchantData = useCallback(() => dispatch(actions.merchantData()), [
    dispatch,
  ]);
  const onMerchantEditData = merchant =>
    dispatch(actions.merchantEditData(merchant));
  const onFetchStates = useCallback(() => dispatch(actions.fetchStates()), [
    dispatch,
  ]);
  const onFetchCities = useCallback(
    state => dispatch(actions.fetchCities(state)),
    [dispatch],
  );
  const onFetchAddress = postalCode =>
    dispatch(actions.fetchAddress(postalCode));

  /* Constants */
  const aPayments = [
    {
      code: 'DINHEIRO',
      label: 'Dinheiro',
    },
    {
      code: 'VA',
      label: 'Vale-Alimentação',
    },
    {
      code: 'CARTAO_DEBITO',
      label: 'Cartão de Débito',
    },
    {
      code: 'CARTAO_CREDITO',
      label: 'Cartão de Crédito',
    },
    {
      code: 'VR',
      label: 'Vale-Refeição',
    },
  ];

  const aCategories = [
    {
      code: 'AFRICANA',
      label: 'Africana',
    },
    {
      code: 'ALEMA',
      label: 'Alemã',
    },
    {
      code: 'ARABE',
      label: 'Árabe',
    },
    {
      code: 'ARGENTINA',
      label: 'Argentina',
    },
    {
      code: 'ASIATICA',
      label: 'Asiática',
    },
    {
      code: 'ACAI',
      label: 'Açai',
    },
    {
      code: 'BAIANA',
      label: 'Baiana',
    },
    {
      code: 'BEBIDAS',
      label: 'Bebidas',
    },
    {
      code: 'BRASILEIRA',
      label: 'Brasileira',
    },
    {
      code: 'CAFETERIA',
      label: 'Cafeteria',
    },
    {
      code: 'CARNES',
      label: 'Carnes',
    },
    {
      code: 'CASA_DE_SUCOS',
      label: 'Casa de Sucos',
    },
    {
      code: 'CHINESA',
      label: 'Chinesa',
    },
    {
      code: 'COLOMBIANA',
      label: 'Colombiana',
    },
    {
      code: 'CONGELADOS_FIT',
      label: 'Congelados Fit',
    },
    {
      code: 'CONGELADOS',
      label: 'Congelados',
    },
    {
      code: 'CONTEMPORANEA',
      label: 'Contemporânea',
    },
    {
      code: 'CONVENIENCIA',
      label: 'Conveniência',
    },
    {
      code: 'COREANA',
      label: 'Coreana',
    },
    {
      code: 'COZINHA_RAPIDA',
      label: 'Cozinha Rápida',
    },
    {
      code: 'CREPE',
      label: 'Crepe',
    },
    {
      code: 'DOCES_BOLOS',
      label: 'Doces e Bolos',
    },
    {
      code: 'ESPANHOLA',
      label: 'Espanhola',
    },
    {
      code: 'FRANCESA',
      label: 'Francesa',
    },
    {
      code: 'FRANGOS',
      label: 'Frangos',
    },
    {
      code: 'FRUTOS_DO_MAR',
      label: 'Frutos do Mar',
    },
    {
      code: 'GAUCHA',
      label: 'Gaúcha',
    },
    {
      code: 'GREGA',
      label: 'Grega',
    },
    {
      code: 'HAMBURGUER',
      label: 'Hambúrguer',
    },
    {
      code: 'INDIANA',
      label: 'Indiana',
    },
    {
      code: 'ITALIANA',
      label: 'Italiana',
    },
    {
      code: 'JAPONESA',
      label: 'Japonesa',
    },
    {
      code: 'LANCHES',
      label: 'Lanches',
    },
    {
      code: 'MARMITA',
      label: 'Marmita',
    },
    {
      code: 'MARROQUINA',
      label: 'Marroquina',
    },
    {
      code: 'MEDITERRANEA',
      label: 'Mediterrânea',
    },
    {
      code: 'MERCADO',
      label: 'Mercado',
    },
    {
      code: 'MEXICANA',
      label: 'Mexicana',
    },
    {
      code: 'MINEIRA',
      label: 'Mineira',
    },
    {
      code: 'NORDESTINA',
      label: 'Nordestina',
    },
    {
      code: 'PADARIA',
      label: 'Padaria',
    },
    {
      code: 'PANQUECA',
      label: 'Panqueca',
    },
    {
      code: 'PARANAENSE',
      label: 'Paranaense',
    },
    {
      code: 'PASTEL',
      label: 'Pastel',
    },
    {
      code: 'PEIXES',
      label: 'Peixes',
    },
    {
      code: 'PERUANA',
      label: 'Peruana',
    },
    {
      code: 'PIZZA',
      label: 'Pizza',
    },
    {
      code: 'PORTUGUESA',
      label: 'Portuguesa',
    },
    {
      code: 'PRESENTES',
      label: 'Presentes',
    },
    {
      code: 'SALGADOS',
      label: 'Salgados',
    },
    {
      code: 'SAUDAVEL',
      label: 'Saudável',
    },
    {
      code: 'SOPAS_CALDOS',
      label: 'Sopas e Caldos',
    },
    {
      code: 'SORVETES',
      label: 'Sorvetes',
    },
    {
      code: 'TAILANDESA',
      label: 'Tailandesa',
    },
    {
      code: 'TAPIOCA',
      label: 'Tapioca',
    },
    {
      code: 'TIPICA_NORTE',
      label: 'Típica do Norte',
    },
    {
      code: 'VARIADA',
      label: 'Variada',
    },
    {
      code: 'VEGANA',
      label: 'Vegana',
    },
    {
      code: 'VEGETARIANA',
      label: 'Vegatariana',
    },
    {
      code: 'XIS',
      label: 'Xis',
    },
    {
      code: 'YAKISOBA',
      label: 'Yakisoba',
    },
  ];

  /* React State Hooks  */
  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
    document: '',
    businessStart: new Date(),
    businessEnd: new Date(),
    description: '',
    basePreparationTime: '',
    logo: '',
    postalCode: '',
    state: '',
    city: '',
    neighborhood: '',
    streetName: '',
    streetNumber: '',
    rate: '',
    coordinates: [],
    categories: [],
    skus: [],
    merchantType: [],
    allowedPayments: [],
  });
  const [valid, setValid] = useState({
    email: true,
    name: true,
    phone: true,
    document: true,
    businessStart: true,
    businessEnd: true,
    description: true,
    basePreparationTime: true,
    logo: true,
    postalCode: true,
    state: true,
    city: true,
    neighborhood: true,
    streetName: true,
    streetNumber: true,
    rate: true,
    coordinates: true,
    categories: true,
    skus: true,
    merchantType: true,
    allowedPayments: true,
  });
  const [submitted, setSubmitted] = useState(false);

  /* Functions */
  // Loads merchant Data on page enter
  useEffect(() => {
    onMerchantData();
  }, [onMerchantData]);

  // On page load fetch all the states
  useEffect(() => {
    onFetchStates();
  }, [onFetchStates]);

  // Each time we fetch the user address by postalCode, fill the fields
  useEffect(() => {
    if (address) {
      setForm(state => ({
        ...state,
        streetName: address.logradouro,
        state: address.uf,
        neighborhood: address.bairro,
        city: address.localidade,
      }));

      onFetchCities(address.uf);
    }
  }, [address, onFetchCities]);

  // Set merchant data after successful load
  useEffect(() => {
    if (merchant) {
      setForm({
        email: merchant.email,
        name: merchant.name,
        phone: merchant.phone,
        document: merchant.document,
        businessStart: new Date(
          0,
          0,
          0,
          merchant.businessStart.split(':')[0],
          merchant.businessStart.split(':')[1],
        ),
        businessEnd: new Date(
          0,
          0,
          0,
          merchant.businessEnd.split(':')[0],
          merchant.businessEnd.split(':')[1],
        ),
        description: merchant.description,
        basePreparationTime: merchant.basePreparationTime,
        logo: merchant.logo,
        postalCode: merchant.postalCode,
        state: merchant.state,
        city: merchant.city,
        neighborhood: merchant.neighborhood,
        streetName: merchant.streetName,
        streetNumber: merchant.streetNumber,
        rate: merchant.rate,
        coordinates: merchant.coordinates,
        merchantType: merchant.merchantType,
        categories: merchant.categories,
        skus: merchant.skus,
        allowedPayments: merchant.allowedPayments,
      });
    }
  }, [merchant]);

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      document: validateCompanyDocument(form.document),
      businessStart: Boolean(form.businessStart),
      businessEnd: Boolean(form.businessEnd),
      description: Boolean(form.description),
      basePreparationTime: Boolean(form.basePreparationTime),
      logo: Boolean(form.logo),
      postalCode: Boolean(form.postalCode),
      state: Boolean(form.state),
      city: Boolean(form.city),
      neighborhood: Boolean(form.neighborhood),
      streetName: Boolean(form.streetName),
      streetNumber: Boolean(form.streetNumber),
      rate: Boolean(form.rate),
      coordinates: Boolean(form.coordinates.length),
      categories: Boolean(form.categories.length),
      merchantType: Boolean(form.merchantType.length),
      skus: Boolean(form.skus.length),
      allowedPayments: Boolean(form.allowedPayments.length),
    });
  }, [form]);

  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Set the state and fetch the state cities
  const handleState = (event, value) => {
    setForm({ ...form, state: value, city: '' });
    onFetchCities(value);
  };

  // Set the chosen city
  const handleCity = (event, value) => {
    setForm({ ...form, city: value });
  };

  const handleBusinessStart = value => {
    setForm({ ...form, businessStart: value });
  };

  const handleBusinessEnd = value => {
    setForm({ ...form, businessEnd: value });
  };

  // Fetches the user address by postalCode, if google api doesn't find any coordinates
  // throw an error, otherwise, then we search for the postalCode on ViaCep
  const handleAddress = () => {
    geocodeByAddress(unmask(form.postalCode))
      .then(res => {
        getLatLng(res[0]).then(({ lat, lng }) => {
          setForm(state => ({
            ...state,
            coordinates: [lat, lng],
          }));
        });

        if (validatePostalCode(form.postalCode)) {
          onFetchAddress(form.postalCode);
        }
      })
      .catch(err => {
        if (err === 'ZERO_RESULTS') {
          if (validatePostalCode(form.postalCode)) {
            onFetchAddress('00000-000');
          }
        }
      });
  };

  // On submit we first check if there are any invalid fields, if any we show the
  // invalid fields with their respective errors, otherwise we proceed to register the new user
  const handleSubmit = event => {
    event.preventDefault();

    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      onMerchantEditData(form);
  };

  // Set Toast
  const setToast = message => {
    return (
      <Snackbar
        open={true}
        autoHideDuration={10000}
        onClose={() => (toast = '')}
      >
        <Toast onClose={() => (toast = '')} severity="error">
          {message}
        </Toast>
      </Snackbar>
    );
  };

  let toast;
  let redirect;
  // If we get a 400 error from viacep, it means the server couldn't find the address from the postal code
  postalCodeError === 400 &&
    (toast = setToast('CEP não encontrado, tente novamente!'));
  // If we get a 400 error, it means the user is trying to submit an incomplete form
  error === 400 &&
    (toast = setToast('Erro de de formulário, preencha todos os campos!'));
  // If we get a 403 error, it means the user is trying to access something it doesn't have access
  error === 403 &&
    (toast = setToast(
      'Erro de permissão, contate um administrador caso continue vendo este erro!',
    ));
  // If we get a 404 error, it means the user reached a null pointer!
  error === 404 &&
    (toast = setToast(
      'Erro de acesso, contate um administrador caso continue vendo este erro!',
    ));
  // If we get 500, 503 or 504 redirects the user to not found page
  (error === 500 || error === 503 || error === 504) &&
    (redirect = <Redirect to="/not-found" />);

  return (
    <div className={classes.container}>
      {redirect}
      {toast}

      <Grid container className={classes.container_body}>
        <Card className={classes.card}>
          <form name="form" onSubmit={handleSubmit}>
            <CardContent>
              <Grid container item justify="center">
                <Grid container item justify="center" xs={12}>
                  <span className={classes.card_title}>
                    Dados do Restaurante
                  </span>
                </Grid>

                {loading ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    <Grid container item justify="center" xs={12} sm={6}>
                      <TextField
                        name="email"
                        label="Email para Acesso"
                        variant="outlined"
                        disabled
                        className={classes.card_input}
                        value={form.email}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <TextField
                        name="name"
                        label="Nome do Restaurante"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.name}
                        error={!valid.name && submitted}
                        onChange={handleChange}
                        helperText={
                          !valid.name &&
                          submitted &&
                          'Nome do Restaurante inválido!'
                        }
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12}>
                      <TextField
                        name="description"
                        label="Descrição Breve do Restaurante"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.description}
                        error={!valid.description && submitted}
                        onChange={handleChange}
                        helperText={
                          !valid.description &&
                          submitted &&
                          'Descrição do Restaurante inválida!'
                        }
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <InputMask
                        mask="99.999.999/9999-99"
                        value={form.document}
                        onChange={handleChange}
                      >
                        {() => (
                          <TextField
                            name="document"
                            label="CNPJ"
                            variant="outlined"
                            className={classes.card_input}
                            error={!valid.document && submitted}
                            helperText={
                              !valid.document && submitted && 'CNPJ inválido!'
                            }
                          />
                        )}
                      </InputMask>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={form.phone}
                        onChange={handleChange}
                      >
                        {() => (
                          <TextField
                            name="phone"
                            label="Celular"
                            variant="outlined"
                            className={classes.card_input}
                            error={!valid.phone && submitted}
                            helperText={
                              !valid.phone &&
                              submitted &&
                              'Telefone Celular inválido!'
                            }
                          />
                        )}
                      </InputMask>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          className={classes.card_input}
                          ampm={false}
                          margin="normal"
                          label="Hora de Abertura"
                          value={form.businessStart}
                          onChange={handleBusinessStart}
                          inputVariant="outlined"
                          invalidDateMessage="Hora Inválida"
                          emptyLabel={
                            !valid.businessStart &&
                            submitted &&
                            'Hora Inválida!'
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          className={classes.card_input}
                          ampm={false}
                          margin="normal"
                          label="Hora de Fechamento"
                          value={form.businessEnd}
                          onChange={handleBusinessEnd}
                          inputVariant="outlined"
                          invalidDateMessage="Hora Inválida"
                          emptyLabel={
                            !valid.businessEnd && submitted && 'Hora Inválida!'
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={3}>
                      <TextField
                        type="number"
                        name="basePreparationTime"
                        label="Tempo de Preparo (min)"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.basePreparationTime}
                        error={!valid.basePreparationTime && submitted}
                        onChange={handleChange}
                        helperText={
                          !valid.basePreparationTime &&
                          submitted &&
                          'Tempo médio de preparo inválido!'
                        }
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={3}>
                      <TextField
                        name="logo"
                        label="URL da Logo"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.logo}
                        error={!valid.logo && submitted}
                        onChange={handleChange}
                        helperText={!valid.logo && submitted && 'URL inválida!'}
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <FormControl
                        className={classes.card_select}
                        variant="outlined"
                        error={!valid.merchantType && submitted}
                      >
                        <InputLabel>Categorias</InputLabel>
                        <Select
                          name="categories"
                          multiple
                          value={form.merchantType}
                          onChange={handleChange}
                          label="Categorias"
                        >
                          {aCategories.map(oCategory => (
                            <MenuItem
                              key={oCategory.code}
                              value={oCategory.code}
                            >
                              {oCategory.label}
                            </MenuItem>
                          ))}
                        </Select>

                        {!valid.merchantType && submitted && (
                          <FormHelperText>
                            Selecione ao menos uma categoria!
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <FormControl
                        className={classes.card_select}
                        variant="outlined"
                        error={!valid.allowedPayments && submitted}
                      >
                        <InputLabel>Meios de Pagamento</InputLabel>
                        <Select
                          name="allowedPayments"
                          multiple
                          value={form.allowedPayments}
                          onChange={handleChange}
                          label="Meios de Pagamento"
                        >
                          {aPayments.map(oPayments => (
                            <MenuItem
                              key={oPayments.code}
                              value={oPayments.code}
                            >
                              {oPayments.label}
                            </MenuItem>
                          ))}
                        </Select>

                        {!valid.allowedPayments && submitted && (
                          <FormHelperText>
                            Selecione ao menos um meio de pagamento!
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid container item justify="center" xs={12}>
                      <span className={classes.card_title}>
                        Endereço do Restaurante
                      </span>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <InputMask
                        mask="99999-999"
                        value={form.postalCode}
                        onChange={handleChange}
                      >
                        {() => (
                          <TextField
                            name="postalCode"
                            label="CEP"
                            variant="outlined"
                            className={classes.card_input}
                            error={!valid.postalCode && submitted}
                            helperText={
                              !valid.postalCode && submitted && 'CEP inválido!'
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={handleAddress}>
                                    <SearchOutlined />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      </InputMask>
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <Autocomplete
                        options={states?.map(state => state.sigla) || []}
                        autoHighlight
                        className={classes.card_select}
                        noOptionsText="Nenhum estado encontrado"
                        getOptionLabel={option => option}
                        getOptionSelected={(option, value) =>
                          option.id === value.id
                        }
                        renderOption={option => (
                          <React.Fragment>{option}</React.Fragment>
                        )}
                        value={form.state}
                        onChange={handleState}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Selecione um Estado"
                            variant="outlined"
                            error={!valid.state && submitted}
                            helperText={
                              !valid.state && submitted && 'Estado inválido!'
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <Autocomplete
                        options={cities?.map(city => city.nome) || []}
                        autoHighlight
                        className={classes.card_select}
                        noOptionsText="Nenhuma cidade encontrada"
                        getOptionLabel={option => option}
                        getOptionSelected={(option, value) =>
                          option.id === value.id
                        }
                        renderOption={option => (
                          <React.Fragment>{option}</React.Fragment>
                        )}
                        value={form.city}
                        onChange={handleCity}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Selecione uma Cidade"
                            variant="outlined"
                            error={!valid.city && submitted}
                            helperText={
                              !valid.city && submitted && 'Cidade inválida!'
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={6}>
                      <TextField
                        name="neighborhood"
                        label="Bairro"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.neighborhood}
                        error={!valid.neighborhood && submitted}
                        onChange={handleChange}
                        helperText={
                          !valid.neighborhood && submitted && 'Bairro inválido!'
                        }
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={10}>
                      <TextField
                        name="streetName"
                        label="Endereço do Restaurante"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.streetName}
                        error={!valid.streetName && submitted}
                        onChange={handleChange}
                        helperText={
                          !valid.streetName && submitted && 'Rua inválida!'
                        }
                      />
                    </Grid>

                    <Grid container item justify="center" xs={12} sm={2}>
                      <TextField
                        name="streetNumber"
                        label="Número"
                        variant="outlined"
                        className={classes.card_input}
                        value={form.streetNumber}
                        error={!valid.streetNumber && submitted}
                        onChange={handleChange}
                        helperText={
                          !valid.streetNumber && submitted && 'Número inválido!'
                        }
                      />
                    </Grid>
                  </Fragment>
                )}
              </Grid>
            </CardContent>

            <CardActions className={classes.card_actions}>
              <Grid container item justify="center" xs={12} sm={9}>
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={loading}
                  className={classes.card_actions__button}
                >
                  {loading ? <CircularProgress color="secondary" /> : 'Salvar'}
                </Button>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </div>
  );
};
