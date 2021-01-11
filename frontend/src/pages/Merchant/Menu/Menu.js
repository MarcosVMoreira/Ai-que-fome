import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Fab,
  FormControlLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import { AddIcon, DataGrid } from '@material-ui/data-grid';
import { DeleteRounded, EditRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import classes from './Menu.module.scss';

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const merchant = useSelector(state => state.merchant.merchant) || null;

  const categoriesColumns = [
    { field: 'name', headerName: 'Categoria', flex: 1 },
    {
      field: 'availability',
      headerName: 'Estado',
      flex: 0.5,
      renderCell: params => renderStatus(params),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      renderCell: params => renderActions(params),
    },
  ];

  const skuColumns = [
    { field: 'name', headerName: 'Item', flex: 1, type: 'string' },
    {
      field: 'price',
      headerName: 'Preço',
      flex: 0.5,
      renderCell: params => `R$${params.value.toFixed(2).replace('.', ',')}`,
    },
    {
      field: 'availability',
      headerName: 'Estado',
      flex: 0.5,
      renderCell: params => renderStatus(params),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      renderCell: params => renderActions(params),
    },
  ];

  const renderStatus = params => {
    return (
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={params.value}
            name={'col' + params.rowIndex}
          />
        }
        label={params.value ? 'Ativo' : 'Inativo'}
      />
    );
  };

  const renderActions = params => {
    return (
      <ButtonGroup variant="contained" size="small" color="secondary">
        <Button onClick={() => handleEdit(params)}>
          <EditRounded style={{ color: '#f5b800' }} />
        </Button>

        <Button onClick={() => handleDelete(params)}>
          <DeleteRounded color="primary" />
        </Button>
      </ButtonGroup>
    );
  };

  const handleEdit = params => {
    console.log(params);
  };

  const handleDelete = params => {
    console.log(params);
  };

  const handleSelectRow = event => {
    setSelectedCategory(event.data.id);
  };

  return (
    <div className={classes.container}>
      {!merchant ? (
        <Spinner />
      ) : (
        <Grid container className={classes.container_body}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container justify="space-between">
                <Grid
                  container
                  alignItems="flex-end"
                  direction="column"
                  item
                  xs={6}
                  spacing={3}
                >
                  <Grid item>
                    <Fab color="primary" variant="extended">
                      <AddIcon />
                      Adicionar Categoria
                    </Fab>
                  </Grid>

                  <Grid item className={classes.card_table}>
                    <DataGrid
                      rows={merchant.categories}
                      columns={categoriesColumns}
                      hideFooter
                      disableColumnMenu
                      onRowSelected={handleSelectRow}
                    />
                  </Grid>
                </Grid>

                {selectedCategory && (
                  <Grid
                    container
                    alignItems="flex-end"
                    direction="column"
                    item
                    xs={6}
                    spacing={3}
                  >
                    <Grid item>
                      <Fab color="primary" variant="extended">
                        <AddIcon />
                        Adicionar Item
                      </Fab>
                    </Grid>

                    <Grid item className={classes.card_table}>
                      <DataGrid
                        rows={merchant.skus.filter(
                          el => el.idCategory === selectedCategory,
                        )}
                        columns={skuColumns}
                        hideFooter
                        disableColumnMenu
                        disableSelectionOnClick
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </div>
  );
};
