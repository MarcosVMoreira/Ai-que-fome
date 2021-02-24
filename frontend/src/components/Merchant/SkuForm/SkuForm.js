import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddIcon, DataGrid, GridOverlay } from '@material-ui/data-grid';
import { DeleteRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { validatePrice } from '../../../helpers/validation';
import classes from './SkuForm.module.scss';

export const SkuForm = props => {
  /* React State Hooks */
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    options: [],
  });
  const [valid, setValid] = useState({
    name: true,
    price: true,
    description: true,
    options: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const [optionsForm, setOptionsForm] = useState({
    name: '',
    price: '',
    minQuantity: '',
    maxQuantity: '',
  });
  const [optionsValid, setOptionsValid] = useState({
    name: true,
    price: true,
    minQuantity: true,
    maxQuantity: true,
  });
  const [optionsSubmitted, setOptionsSubmitted] = useState(false);

  const optionsColumns = [
    { field: 'name', headerName: 'Opção', flex: 1, type: 'string' },
    {
      field: 'price',
      headerName: 'Preço',
      flex: 0.5,
      renderCell: params => `R$${params.value.toFixed(2).replace('.', ',')}`,
    },
    {
      field: 'minQuantity',
      headerName: 'Mín.',
      flex: 0.5,
    },
    {
      field: 'maxQuantity',
      headerName: 'Máx.',
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      renderCell: params => renderActions(params),
    },
  ];

  const renderActions = params => {
    return (
      <ButtonGroup size="small" color="secondary">
        <Button onClick={() => handleDelete(params)}>
          <DeleteRounded color="primary" />
        </Button>
      </ButtonGroup>
    );
  };

  const renderEmptyTable = () => {
    return (
      <GridOverlay>
        <div>Nenhum Resultado</div>
      </GridOverlay>
    );
  };

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Changes each option field state when user types
  const handleOptionsChange = event => {
    let { name, value } = event.target;
    setOptionsForm({ ...optionsForm, [name]: value });
  };

  // Add Option to Item
  const handleAdd = () => {
    setOptionsSubmitted(true);
    Object.keys(optionsValid).reduce(
      (sum, value) => sum && optionsValid[value],
      true,
    ) &&
      setForm(state => {
        const newState = {
          ...state,
          options: [
            ...state.options,
            { ...optionsForm, id: uuid(), price: Number(optionsForm.price) },
          ],
        };

        resetOptionsForm();
        return newState;
      });
  };

  // Delete Option from Item
  const handleDelete = params => {
    console.log(params);
    const optionsCopy = [...form.options];
    optionsCopy.splice(params.rowIndex, 1);
    setForm({ ...form, options: optionsCopy });
  };

  // Closes the Modal
  const handleClose = type => {
    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      props.handleClose(type, {
        ...form,
        index: props.index,
        price: Number(form.price),
        id: props.sku?.id || null,
      });
  };

  // Resets Options form and Submitted after successful submit
  const resetOptionsForm = () => {
    setOptionsForm({
      name: '',
      price: '',
      minQuantity: '',
      maxQuantity: '',
    });

    setOptionsSubmitted(false);
  };

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({
      name: Boolean(form.name),
      price: validatePrice(form.price),
      description: Boolean(form.description),
      options: Boolean(form.options),
    });
  }, [form]);

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setOptionsValid({
      name: Boolean(optionsForm.name),
      price: validatePrice(optionsForm.price),
      minQuantity: Boolean(optionsForm.minQuantity),
      maxQuantity: Boolean(optionsForm.maxQuantity),
    });
  }, [optionsForm]);

  // Each time the sku changes we set the new value on the input
  useEffect(() => {
    if (props.sku) {
      setForm({
        name: props.sku.name,
        price: props.sku.price,
        image: props.sku.image,
        description: props.sku.description,
        options: props.sku.options,
      });
    }
  }, [props.sku]);

  return (
    <Dialog open={true} onClose={() => props.handleClose('cancel')}>
      <DialogTitle>{props.sku ? 'Editar Item' : 'Criar Item'}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Os itens são os responsáveis por fazerem seu restaurante ser único
          entre os outros.
        </DialogContentText>

        <Grid container spacing={3}>
          <Grid item xs={9}>
            <TextField
              autoFocus
              name="name"
              label="Nome do Item"
              variant="outlined"
              className={classes.input}
              value={form.name}
              error={!valid.name && submitted}
              onChange={handleChange}
              helperText={!valid.name && submitted && 'Nome inválido!'}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              value={form.price}
              onChange={handleChange}
              name="price"
              label="Preço"
              variant="outlined"
              className={classes.input}
              error={!valid.price && submitted}
              helperText={!valid.price && submitted && 'Preço inválido!'}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="image"
              label="Foto do Item"
              variant="outlined"
              className={classes.input}
              value={form.image}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Descrição breve do Item"
              variant="outlined"
              className={classes.input}
              value={form.description}
              error={!valid.description && submitted}
              onChange={handleChange}
              helperText={
                !valid.description && submitted && 'Descrição inválida!'
              }
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Adicionais
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <DialogContentText>
              Adicionais são sub itens que podem ser agregados ao produto
              principal.
            </DialogContentText>
          </Grid>

          <Grid item xs={8}>
            <TextField
              name="name"
              label="Nome"
              value={optionsForm.name}
              error={!optionsValid.name && optionsSubmitted}
              onChange={handleOptionsChange}
              className={classes.input}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="price"
              label="Preço"
              value={optionsForm.price}
              error={!optionsValid.price && optionsSubmitted}
              onChange={handleOptionsChange}
              className={classes.input}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="minQuantity"
              label="Mínimo"
              type="number"
              value={optionsForm.minQuantity}
              error={!optionsValid.minQuantity && optionsSubmitted}
              onChange={handleOptionsChange}
              className={classes.input}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="maxQuantity"
              label="Máximo"
              type="number"
              value={optionsForm.maxQuantity}
              error={!optionsValid.maxQuantity && optionsSubmitted}
              onChange={handleOptionsChange}
              className={classes.input}
            />
          </Grid>

          <Grid item xs={4}>
            <Button
              fullWidth
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              onClick={handleAdd}
            >
              Adicionar
            </Button>
          </Grid>

          <Grid item className={classes.table}>
            <DataGrid
              components={{ noRowsOverlay: renderEmptyTable }}
              rows={form.options || []}
              columns={optionsColumns}
              hideFooter
              disableColumnMenu
              disableSelectionOnClick
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.handleClose('cancel')} color="primary">
          Cancelar
        </Button>

        {props.sku ? (
          <Button onClick={() => handleClose('edit')} color="primary">
            Salvar
          </Button>
        ) : (
          <Button onClick={() => handleClose('create')} color="primary">
            Criar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
