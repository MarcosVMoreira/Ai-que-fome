import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Snackbar,
  Switch,
} from '@material-ui/core';
import { AddIcon, DataGrid, GridOverlay } from '@material-ui/data-grid';
import { DeleteRounded, EditRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { CategoryForm } from '../../../components/Merchant/CategoryForm/CategoryForm';
import { SkuForm } from '../../../components/Merchant/SkuForm/SkuForm';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { Toast } from '../../../components/Shared/Toast/Toast';
import * as actions from '../../../store/actions/index';
import classes from './Menu.module.scss';

export const Menu = () => {
  /* React State Hooks */
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categoryAction, setCategoryAction] = useState(null);
  const [skuAction, setSkuAction] = useState(null);

  /* Redux Dispatchers */
  const dispatch = useDispatch();
  const onMerchantPutCategories = categories =>
    dispatch(actions.merchantPutCategories(categories));

  /* Redux Selectors */
  const merchant = useSelector(state => state.merchant.merchant) || [];
  const error = useSelector(state => state.merchant.error);
  const loading = useSelector(state => state.merchant.loading);

  useEffect(() => {
    if (merchant) {
      setCategories(merchant.categories || []);
    }
  }, [merchant]);

  /* Constants */
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
            onClick={() => handleStatus(params)}
          />
        }
        label={params.value ? 'Ativo' : 'Inativo'}
      />
    );
  };

  const renderActions = params => {
    return (
      <ButtonGroup size="small" color="secondary">
        <Button onClick={() => handleEdit(params)}>
          <EditRounded style={{ color: '#f5b800' }} />
        </Button>

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

  // If type is SKU, open SKU form, otherwise opens Category Form
  const handleAdd = type => {
    if (type === 'sku') {
      setSkuAction({ sku: null, index: null });
    } else if (type === 'category') {
      setCategoryAction({ category: null, index: null });
    }
  };

  // If we have description field it means we are handling a SKU otherwise it's a category
  const handleEdit = params => {
    if (params.row.description) {
      setSkuAction({ sku: params.row, index: params.rowIndex });
    } else {
      setCategoryAction({ category: params.row, index: params.rowIndex });
    }
  };

  // If we have description field it means we are handling a SKU otherwise it's a category
  const handleDelete = params => {
    if (params.row.description) {
      const categoriesCopy = [...categories];
      const categoriesIndex = categoriesCopy.findIndex(
        el => el.id === selectedCategory,
      );

      const skusCopy = [...categoriesCopy[categoriesIndex].skus];
      skusCopy.splice(params.rowIndex, 1);

      categoriesCopy[categoriesIndex] = {
        ...categoriesCopy[categoriesIndex],
        skus: [...skusCopy],
      };

      setCategories([...categoriesCopy]);
    } else {
      const categoriesCopy = [...categories];
      categoriesCopy.splice(params.rowIndex, 1);
      setCategories([...categoriesCopy]);
      setSelectedCategory(null);
    }
  };

  // If we have description field it means we are handling a SKU otherwise it's a category
  const handleStatus = params => {
    if (params.row.description) {
      const categoriesCopy = [...categories];
      const categoriesIndex = categoriesCopy.findIndex(
        el => el.id === selectedCategory,
      );

      const skusCopy = [...categoriesCopy[categoriesIndex].skus];
      skusCopy[params.rowIndex] = {
        ...params.row,
        availability: !params.row.availability,
      };

      categoriesCopy[categoriesIndex] = {
        ...categoriesCopy[categoriesIndex],
        skus: [...skusCopy],
      };

      setCategories([...categoriesCopy]);
    } else {
      const categoriesCopy = [...categories];
      categoriesCopy[params.rowIndex] = {
        ...categoriesCopy[params.rowIndex],
        availability: !categoriesCopy[params.rowIndex].availability,
      };
      setCategories([...categoriesCopy]);
    }
  };

  // Handle form after submit, if we are creating concat the new category in the categories array
  // otherwise we have to set the new value to the selected category
  const handleCategoryClose = (type, value) => {
    let categoriesCopy;

    switch (type) {
      case 'create':
        setCategories([
          ...categories,
          { name: value.name, availability: true, id: uuid(), skus: [] },
        ]);
        break;
      case 'edit':
        categoriesCopy = [...categories];
        categoriesCopy[value.index] = {
          ...categoriesCopy[value.index],
          name: value.name,
        };
        setCategories([...categoriesCopy]);
        break;
      default:
        break;
    }

    setCategoryAction(null);
  };

  // Handle form after submit, if we are creating concat the new item in the options array
  // otherwise we have to set the new value to the selected option
  const handleSkuClose = (type, value) => {
    let skusCopy, categoriesCopy, categoriesIndex;

    switch (type) {
      case 'create':
        categoriesCopy = [...categories];
        categoriesIndex = categoriesCopy.findIndex(
          el => el.id === selectedCategory,
        );

        categoriesCopy[categoriesIndex] = {
          ...categoriesCopy[categoriesIndex],
          skus: [
            ...(categoriesCopy[categoriesIndex].skus || []),
            {
              ...value,
              availability: true,
              id: uuid(),
              categoryId: selectedCategory,
            },
          ],
        };

        setCategories([...categoriesCopy]);
        break;
      case 'edit':
        categoriesCopy = [...categories];
        categoriesIndex = categoriesCopy.findIndex(
          el => el.id === selectedCategory,
        );

        skusCopy = [...categoriesCopy[categoriesIndex].skus];
        skusCopy[value.index] = {
          ...value,
          availability: true,
          categoryId: selectedCategory,
        };

        categoriesCopy[categoriesIndex] = {
          ...categoriesCopy[categoriesIndex],
          skus: [...skusCopy],
        };

        setCategories([...categoriesCopy]);
        break;
      default:
        break;
    }

    setSkuAction(null);
  };

  // Set the selected category id
  const handleSelectRow = event => {
    setSelectedCategory(event.data.id);
  };

  // Submit the new merchant categories
  const handleSubmit = () => {
    onMerchantPutCategories([...categories]);
    setSelectedCategory(null);
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

      {loading || !categories ? (
        <Spinner />
      ) : (
        <Grid container className={classes.container_body}>
          {categoryAction && (
            <CategoryForm
              {...categoryAction}
              handleClose={handleCategoryClose}
            />
          )}

          {skuAction && <SkuForm {...skuAction} handleClose={handleSkuClose} />}

          <Card className={classes.card}>
            <CardContent>
              <Grid container justify="space-between">
                <Grid
                  container
                  alignItems="flex-start"
                  direction="column"
                  item
                  xs={6}
                  spacing={3}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleAdd('category')}
                      startIcon={<AddIcon />}
                    >
                      Adicionar Categoria
                    </Button>
                  </Grid>

                  <Grid item className={classes.card_table}>
                    <DataGrid
                      components={{ noRowsOverlay: renderEmptyTable }}
                      rows={categories}
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
                    alignItems="flex-start"
                    direction="column"
                    item
                    xs={6}
                    spacing={3}
                  >
                    <Grid item>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleAdd('sku')}
                        startIcon={<AddIcon />}
                      >
                        Adicionar Item
                      </Button>
                    </Grid>

                    <Grid item className={classes.card_table}>
                      <DataGrid
                        components={{ noRowsOverlay: renderEmptyTable }}
                        rows={
                          categories.find(el => el.id === selectedCategory)
                            .skus || []
                        }
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

            <CardActions>
              <Button
                color="primary"
                variant="contained"
                style={{ marginLeft: 'auto' }}
                onClick={handleSubmit}
              >
                Salvar Alterações
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </div>
  );
};
