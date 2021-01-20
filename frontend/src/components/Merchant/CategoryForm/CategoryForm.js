import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import classes from './CategoryForm.module.scss';

export const CategoryForm = props => {
  /* React State Hooks */
  const [form, setForm] = useState({ name: '' });
  const [valid, setValid] = useState({ name: true });
  const [submitted, setSubmitted] = useState(false);

  /* Functions */
  // Changes each field state value when user types
  const handleChange = event => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Closes the Modal
  const handleClose = type => {
    setSubmitted(true);
    Object.keys(valid).reduce((sum, value) => sum && valid[value], true) &&
      props.handleClose(type, { ...form, index: props.index });
  };

  // Each time the user changes any input value we check the validity of them all
  useEffect(() => {
    setValid({ name: Boolean(form.name) });
  }, [form]);

  // Each time the category changes we set the new value on the input
  useEffect(() => {
    if (props.category) {
      setForm({ name: props.category.name });
    }
  }, [props.category]);

  return (
    <Dialog open={true} onClose={() => props.handleClose('cancel')}>
      <DialogTitle>
        {props.category ? 'Editar Categoria' : 'Criar Categoria'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          As categorias agrupam diferentes itens que possuem algo em comum.
        </DialogContentText>

        <TextField
          autoFocus
          name="name"
          label="Nome da Categoria"
          variant="outlined"
          className={classes.input}
          value={form.name}
          error={!valid.name && submitted}
          onChange={handleChange}
          helperText={!valid.name && submitted && 'Nome inválido!'}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.handleClose('cancel')} color="primary">
          Cancelar
        </Button>

        {props.category ? (
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
